import { Customer } from "../shared/index.js";
import { Bank } from "./Bank.js";
import { BankServer } from "./BankServer.js";
import { AccountsController } from "./controllers/AccountsController.js";
import { BankController } from "./controllers/BankController.js";

const bank = new Bank({ bankCode: 'TYPE', countryCode: 'NL', name: 'Typed bank', port: 8080, language: 'nl'});

bank.createAccount(new Customer('Alfred', 'Kwak', 'Jodocus'));
bank.createAccount(new Customer('Brad', 'Pit'));
bank.createAccount(new Customer('Jack', 'Sparrow'));

new BankServer(bank, 
    [
        new BankController(bank),
        new AccountsController(bank)
    ]
).listen();