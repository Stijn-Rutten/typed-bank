const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export class Iban {
    public readonly controlNumber: string;
    public readonly accountNumber: string;

    constructor(
        public readonly countryCode: string,
        public readonly bankCode: string,
    ) {
        this.accountNumber = this.generateAccountNumber();
        this.controlNumber = this.generateControlNumber();
    }

    private generateAccountNumber(): string {
        let accountNumber = Math.floor(Math.random() * 10000000000).toString();
        while (accountNumber.length !== 10) {
            accountNumber += 0;
        }
        return accountNumber;
    }

    /*
    * Generate the control number of an IBAN based on https://nl.wikipedia.org/wiki/International_Bank_Account_Number
    */
    private generateControlNumber(): string {
        // Get index of the bank- and country code 
        const bankCodeIndex = this.stringToIndex(this.bankCode);
        const countryCodeIndex = this.stringToIndex(this.countryCode);

        // Add the numbers together
        let generationNumber = Number(`${bankCodeIndex}${this.accountNumber}${countryCodeIndex}`);
        // Add to additional zero's
        generationNumber *= 100;

        // get the rest number of the division
        const generationRestNumber = generationNumber % 97;
        // subtract rest number from 98 to get the control number 
        const controlNumber = 98 - generationRestNumber;

        // If the control number is less than 10, prefix with a 0
        if (controlNumber < 10) {
            return `0${controlNumber}`;
        }

        return controlNumber.toString();
    }


    private stringToIndex(text: string): string {
        let result = '';

        for (const char of text) {
            result += this.getCharacterAlphabetIndex(char);
        }
        return result;
    }

    /*
    *   Gets the corresponding IBAN control number index for a character in the alphabet
    */
    private getCharacterAlphabetIndex(character: string): string {
        return (ALPHABET.indexOf(character.toLowerCase()) + 10).toString();
    }

    format(): string {
        return `${this.countryCode}${this.controlNumber} ${this.bankCode} ${this.accountNumber.substr(0, 4)} ${this.accountNumber.substr(4, 4)} ${this.accountNumber.substr(8)}`;
    }
}