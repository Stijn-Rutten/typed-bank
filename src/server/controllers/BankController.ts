import express from 'express';
import { Bank } from '../Bank.js';

export class BankController {
    public path = '/bank';
    public router = express.Router();

    constructor(private readonly bank: Bank) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(this.path, this.getBankInformation);
    }

    private getBankInformation = (_: express.Request, response: express.Response) : void => {
        response.json(this.bank.config);
        response.end();
    }
}