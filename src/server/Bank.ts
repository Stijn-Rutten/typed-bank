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
        let message: string;

        switch (this.config.language) {
            case 'en':
                message = `[${this.config.name}] welcomes ${account}`;
                break;
            case 'nl':
                message = `[${this.config.name}] verwelkomt ${account}`;
                break;
            case 'fr':
                message = `[${this.config.name}] accueille ${account}`;
                break;
            default:
                message = `[${this.config.name}] welcomes ${account}`;
                break;

        }
        console.log(message);
    }
}