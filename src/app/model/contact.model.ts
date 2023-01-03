import { Transfer } from "./transfer.model";

export class Contact {

    constructor(
        public _id?: string,
        public name: string = '',
        public phone: string = '',
        public email: string = '',
        public nextId?: string,
        public prevId?: string
        ) { }

    setId?(id: string = 'r101') {
        // Implement your own set Id
        this._id = id
    }
}
