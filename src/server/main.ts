import { Customer } from "../shared/index.js";
import { Bank } from "./Bank.js";
import { BankServer } from "./BankServer.js";

const bank = new Bank({ bankCode: 'TYPE', countryCode: 'NL', name: 'Typed bank', port: 8080});
bank.createAccount(new Customer('Alfred', 'Kwak', 'Jodocus'));
bank.createAccount(new Customer('Brad', 'Pit'));
bank.createAccount(new Customer('Jack', 'Sparrow'));

new BankServer(bank).listen();