export class Customer {
    constructor(
        public firstName: string,
        public lastName: string,
        public insertion?: string
    ) { }

    format(): string {
        return this.insertion
            ? `${this.firstName} ${this.insertion} ${this.lastName}`
            : `${this.firstName} ${this.lastName}`;
    }

    static isCustomer(customer: any): customer is Customer {
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