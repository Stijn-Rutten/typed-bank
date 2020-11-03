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
}