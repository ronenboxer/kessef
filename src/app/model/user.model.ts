import { Transfer } from "./transfer.model";

export class User {

    constructor(
        public _id?: string,
        public name: string = '',
        public phone: string = '',
        public balance: number = 100,
        public username: string = '',
        public email: string = '',
        public transfers: Transfer[] = []
        ) { }

}
