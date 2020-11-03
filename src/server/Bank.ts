import { BankAccount, BankConfig, Customer } from "../shared/index.js";
import { auditLog } from "./auditLog.js";

export class Bank {
    public readonly accounts: BankAccount[] = [];

    constructor(public readonly config: BankConfig) { }

    createAccount(customer: Customer) {
        const account = new BankAccount(customer, this.config.countryCode, this.config.bankCode);
        this.accounts.push(account);

        auditLog(customer, 'assigned');
        this.printWelcomeMessage(account)
    }

    printWelcomeMessage(account: BankAccount): void {
        console.log(`[${this.config.name}] welcomes ${account}`);
    }
}