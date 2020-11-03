import bodyParser from 'body-parser';
import express from 'express';
import { Customer } from '../shared/index.js';
import { Bank } from './Bank.js';
import { loggerMiddleware } from './middleware/logger.js'

interface Controller {
    router: express.Router
}

export class BankServer {
    private readonly app: express.Express

    constructor(private readonly bank: Bank, private readonly controllers: Controller[]) {
        this.app = express();

        this.initializeMiddleware();
        this.initializeStaticFiles();
        this.initializeControllers();
    }

    listen(): void {
        this.app.listen(this.bank.config.port);
        console.log(`Bank "${this.bank.config.name}" listening on port ${this.bank.config.port}`);
    }

    private initializeControllers(): void {
        this.controllers.forEach(controller => {
            this.app.use('/api/', controller.router)
        });
    }

    private initializeMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware);
    }

    private initializeStaticFiles(): void {
        this.app.use(express.static('static'));
        this.app.use(express.static('dist'));
    }    
}