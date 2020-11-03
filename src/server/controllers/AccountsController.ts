import express from 'express';
import { Customer } from '../../shared/index.js';
import { Bank } from '../Bank.js';

export class AccountsController {
    public path = '/accounts';
    public router = express.Router();

    constructor(private readonly bank: Bank) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(this.path, this.getAccounts);
        this.router.post(this.path, this.addAccount);
    }

    private getAccounts = (_request: express.Request, response: express.Response): void  => {
        response.json(this.bank.accounts);
        response.end();
    }

    private addAccount = (request: express.Request, response: express.Response): void => {
        const maybeCustomer: unknown = request.body;
        if (Customer.isCustomer(maybeCustomer)) {
            this.bank.createAccount(new Customer(
                maybeCustomer.firstName,
                maybeCustomer.lastName,
                maybeCustomer.insertion
            ));
            response.status(204);
            response.end();
        } else {
            response.status(422);
            response.end('Customer entity invalid');
        }
    }
}