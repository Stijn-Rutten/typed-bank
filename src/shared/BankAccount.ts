import { Customer } from "./Customer.js";
import { Iban } from "./Iban.js";

export class BankAccount {
    public iban: Iban;

    constructor(public customer: Customer, countryCode: string, bankCode: string,) {
        this.iban = new Iban(countryCode, bankCode);
    }

    toString(): string {
        return `[${this.iban.format()}] ${this.customer.format()}`
    }
}