import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Contact } from '../../model/contact.model';

const CONTACT_STORAGE_KEY = 'contactDB'

const CONTACTS: Contact[] = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || "null") || [{
    _id: "5a56640269f443a5d64b32ca",
    name: "Ochoa Hyde",
    email: "ochoahyde@renovize.com",
    phone: "+1 (968) 593-3824"
},
{
    _id: "5a5664025f6ae9aa24a99fde",
    name: "Hallie Mclean",
    email: "halliemclean@renovize.com",
    phone: "+1 (948) 464-2888"
},
{
    _id: "5a56640252d6acddd183d319",
    name: "Parsons Norris",
    email: "parsonsnorris@renovize.com",
    phone: "+1 (958) 502-3495"
},
{
    _id: "5a566402ed1cf349f0b47b4d",
    name: "Rachel Lowe",
    email: "rachellowe@renovize.com",
    phone: "+1 (911) 475-2312"
},
{
    _id: "5a566402abce24c6bfe4699d",
    name: "Dominique Soto",
    email: "dominiquesoto@renovize.com",
    phone: "+1 (807) 551-3258"
},
{
    _id: "5a566402a6499c1d4da9220a",
    name: "Shana Pope",
    email: "shanapope@renovize.com",
    phone: "+1 (970) 527-3082"
},
{
    _id: "5a566402f90ae30e97f990db",
    name: "Faulkner Flores",
    email: "faulknerflores@renovize.com",
    phone: "+1 (952) 501-2678"
},
{
    _id: "5a5664027bae84ef280ffbdf",
    name: "Holder Bean",
    email: "holderbean@renovize.com",
    phone: "+1 (989) 503-2663"
},
{
    _id: "5a566402e3b846c5f6aec652",
    name: "Rosanne Shelton",
    email: "rosanneshelton@renovize.com",
    phone: "+1 (968) 454-3851"
},
{
    _id: "5a56640272c7dcdf59c3d411",
    name: "Pamela Nolan",
    email: "pamelanolan@renovize.com",
    phone: "+1 (986) 545-2166"
},
{
    _id: "5a5664029a8dd82a6178b15f",
    name: "Roy Cantu",
    email: "roycantu@renovize.com",
    phone: "+1 (929) 571-2295"
},
{
    _id: "5a5664028c096d08eeb13a8a",
    name: "Ollie Christian",
    email: "olliechristian@renovize.com",
    phone: "+1 (977) 419-3550"
},
{
    _id: "5a5664026c53582bb9ebe9d1",
    name: "Nguyen Walls",
    email: "nguyenwalls@renovize.com",
    phone: "+1 (963) 471-3181"
},
{
    _id: "5a56640298ab77236845b82b",

    name: "Glenna Santana",
    email: "glennasantana@renovize.com",
    phone: "+1 (860) 467-2376"
},
{
    _id: "5a56640208fba3e8ecb97305",
    name: "Malone Clark",
    email: "maloneclark@renovize.com",
    phone: "+1 (818) 565-2557"
},
{
    _id: "5a566402abb3146207bc4ec5",
    name: "Floyd Rutledge",
    email: "floydrutledge@renovize.com",
    phone: "+1 (807) 597-3629"
},
{
    _id: "5a56640298500fead8cb1ee5",
    name: "Grace James",
    email: "gracejames@renovize.com",
    phone: "+1 (959) 525-2529"
},
{
    _id: "5a56640243427b8f8445231e",
    name: "Tanner Gates",
    email: "tannergates@renovize.com",
    phone: "+1 (978) 591-2291"
},
{
    _id: "5a5664025c3abdad6f5e098c",
    name: "Lilly Conner",
    email: "lillyconner@renovize.com",
    phone: "+1 (842) 587-3812"
},
{
    _id: "7FkwE3etrB",
    email: "doda@shli.com",
    phone: "+1 (842) 587-3812",
    name: "Doda Shli",
}

]

localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(CONTACTS))

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    //mock the server
    private _contactDB: Contact[] = CONTACTS;
    private _contacts$ = new BehaviorSubject<Contact[]>(this._contactDB)
    private _contacts: Contact[] = []

    public contacts$ = this._contacts$.asObservable()
    public filterBy = {excludedIds:[''], term:''}

    public query(filterBy: { term?: string, excludedIds?: string[] } = this.filterBy): void {
        let contacts = this._contactDB;
        if (filterBy?.term) contacts = this._filter(contacts, filterBy.term)
        if (filterBy?.excludedIds?.length) contacts = contacts.filter(contact => contact._id && !filterBy.excludedIds?.includes(contact._id))
        const contactCount = contacts.length
        contacts = this._sort(contacts).map((contact, idx) => {
            const prevId = contacts[(idx + contactCount - 1) % contactCount]._id
            const nextId = contacts[(idx + contactCount + 1) % contactCount]._id
            const initials = contact.name.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase()
            return { ...contact, prevId, nextId, initials }
        })
        this._contacts = contacts
        this._contacts$.next(this._sort(contacts))
    }


    public getById(id: string): Observable<Contact> {
        //mock the server work
        const contact = this._contacts.find(contact => contact._id === id)
        //return an observable
        return of(contact as Contact)  //throwError(() => `Contact id ${id} not found!`)
    }

    public remove(id: string) {
        //mock the server work
        this._contactDB = this._contactDB.filter(contact => contact._id !== id)

        // change the observable data in the service - let all the subscribers know
        this._contacts$.next(this._contactDB)

        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(this._contactDB))
    }

    public save(contact: Contact) {
        return contact._id ? this._update(contact) : this._add(contact)
    }

    public new(): Contact {
        return {
            name: '',
            phone: '',
            email: ''
        }
    }

    private _update(contact: Contact) {
        //mock the server work
        this._contactDB = this._contactDB.map(c => contact._id === c._id ? contact : c)
        // change the observable data in the service - let all the subscribers know
        this._contacts$.next(this._sort(this._contactDB))
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(this._contactDB))
        return of(contact)
    }

    private _add(contact: Contact) {
        //mock the server work
        const newContact = new Contact(contact.name, contact.email, contact.phone);
        if (typeof newContact.setId === 'function') newContact.setId(getRandomId());
        this._contactDB.push(newContact)
        this._contacts$.next(this._sort(this._contactDB))
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(this._contactDB))
        return of(newContact)
    }

    private _sort(contacts: Contact[]): Contact[] {
        return contacts.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1;
            }

            return 0;
        })
    }

    private _filter(contacts: Contact[], term: string) {
        term = term.toLocaleLowerCase()
        return contacts.filter(contact => {
            return contact.name.toLocaleLowerCase().includes(term) ||
                contact.phone.toLocaleLowerCase().includes(term) ||
                contact.email.toLocaleLowerCase().includes(term)
        })
    }
}


function getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}