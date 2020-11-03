import bodyParser from 'body-parser';
import express from 'express';
import { Customer } from '../shared/index.js';
import { Bank } from './Bank.js';

export class BankServer {
    private readonly app: express.Express

    constructor(private readonly bank: Bank) {
        this.app = express();
    }

    listen(): void {
        const router = this.createRouter();
        this.app.use('/api', router);
        this.app.use(express.static('static'));
        this.app.use(express.static('dist'));
        this.app.use('/src', express.static('src'));
        this.app.use(bodyParser.json());
        this.app.listen(this.bank.config.port);
        console.log(`Bank "${this.bank.config.name}" listening on port ${this.bank.config.port}`);
    }

    private createRouter(): express.Router {
        const router = express.Router({ caseSensitive: false });
        router.get('/bank', (_, res) => {
            console.timeLog('Requested /api/bank');
            res.json(this.bank.config);
        });

        router.route('/accounts')
            .get((_, res) => res.json(this.bank.accounts))
            .post((req, res) => {
                const maybeCustomer = req.body;
                if (this.isValid(maybeCustomer)) {
                    this.bank.createAccount(new Customer(
                        maybeCustomer.firstName,
                        maybeCustomer.lastName,
                        maybeCustomer.insertion
                    ));
                    res.status(204);
                    res.end();
                } else {
                    res.status(422);
                    res.end('Customer entity invalid');
                }
            })

        return router;
    }

    private isValid(customer: any): boolean {
        if (customer
            && customer.firstName && typeof customer.firstName === 'string'
            && customer.lastName && typeof customer.lastName === 'string' &&
            (!customer.insertion || typeof customer.insertion === 'string')) {
            return true;
        } else {
            return false;
        }
    }
}