import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../../model/user.model'
import { AuthService } from '../auth/auth.service';

const USER_STORAGE_KEY = 'userDB'

const USERS: User[] = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) as string) || [{
  _id: "5a56640269f443a5d64b32ca",
  balance: 100,
  transfers: [],
  name: "Ochoa Hyde",
  username: "ochoa",
  email: "ochoahyde@renovize.com",
  phone: "+1 (968) 593-3824"
},
{
  _id: "5a5664025f6ae9aa24a99fde",
  balance: 100,
  transfers: [],
  name: "Hallie Mclean",
  username: "hallie",
  email: "halliemclean@renovize.com",
  phone: "+1 (948) 464-2888"
},
{
  _id: "5a56640252d6acddd183d319",
  balance: 100,
  transfers: [],
  name: "Parsons Norris",
  username: "parsons",
  email: "parsonsnorris@renovize.com",
  phone: "+1 (958) 502-3495"
},
{
  _id: "5a566402ed1cf349f0b47b4d",
  balance: 100,
  transfers: [],
  name: "Rachel Lowe",
  username: "rachel",
  email: "rachellowe@renovize.com",
  phone: "+1 (911) 475-2312"
},
{
  _id: "5a566402abce24c6bfe4699d",
  balance: 100,
  transfers: [],
  name: "Dominique Soto",
  username: "dominique",
  email: "dominiquesoto@renovize.com",
  phone: "+1 (807) 551-3258"
},
{
  _id: "5a566402a6499c1d4da9220a",
  balance: 100,
  transfers: [],
  name: "Shana Pope",
  username: "shana",
  email: "shanapope@renovize.com",
  phone: "+1 (970) 527-3082"
},
{
  _id: "5a566402f90ae30e97f990db",
  balance: 100,
  transfers: [],
  name: "Faulkner Flores",
  username: "faulkner",
  email: "faulknerflores@renovize.com",
  phone: "+1 (952) 501-2678"
},
{
  _id: "5a5664027bae84ef280ffbdf",
  balance: 100,
  transfers: [],
  name: "Holder Bean",
  username: "holder",
  email: "holderbean@renovize.com",
  phone: "+1 (989) 503-2663"
},
{
  _id: "5a566402e3b846c5f6aec652",
  balance: 100,
  transfers: [],
  name: "Rosanne Shelton",
  username: "rosanne",
  email: "rosanneshelton@renovize.com",
  phone: "+1 (968) 454-3851"
},
{
  _id: "5a56640272c7dcdf59c3d411",
  balance: 100,
  transfers: [],
  name: "Pamela Nolan",
  username: "pamela",
  email: "pamelanolan@renovize.com",
  phone: "+1 (986) 545-2166"
},
{
  _id: "5a5664029a8dd82a6178b15f",
  balance: 100,
  transfers: [],
  name: "Roy Cantu",
  username: "roy",
  email: "roycantu@renovize.com",
  phone: "+1 (929) 571-2295"
},
{
  _id: "5a5664028c096d08eeb13a8a",
  balance: 100,
  transfers: [],
  name: "Ollie Christian",
  username: "ollie",
  email: "olliechristian@renovize.com",
  phone: "+1 (977) 419-3550"
},
{
  _id: "5a5664026c53582bb9ebe9d1",
  balance: 100,
  transfers: [],
  name: "Nguyen Walls",
  username: "nguyen",
  email: "nguyenwalls@renovize.com",
  phone: "+1 (963) 471-3181"
},
{
  _id: "5a56640298ab77236845b82b",
  balance: 100,
  transfers: [],

  name: "Glenna Santana",
  username: "glenna",
  email: "glennasantana@renovize.com",
  phone: "+1 (860) 467-2376"
},
{
  _id: "5a56640208fba3e8ecb97305",
  balance: 100,
  transfers: [],
  name: "Malone Clark",
  username: "malone",
  email: "maloneclark@renovize.com",
  phone: "+1 (818) 565-2557"
},
{
  _id: "5a566402abb3146207bc4ec5",
  balance: 100,
  transfers: [],
  name: "Floyd Rutledge",
  username: "floyd",
  email: "floydrutledge@renovize.com",
  phone: "+1 (807) 597-3629"
},
{
  _id: "5a56640298500fead8cb1ee5",
  balance: 100,
  transfers: [],
  name: "Grace James",
  username: "grace",
  email: "gracejames@renovize.com",
  phone: "+1 (959) 525-2529"
},
{
  _id: "5a56640243427b8f8445231e",
  balance: 100,
  transfers: [],
  name: "Tanner Gates",
  username: "tanner",
  email: "tannergates@renovize.com",
  phone: "+1 (978) 591-2291"
},
{
  _id: "5a5664025c3abdad6f5e098c",
  balance: 100,
  transfers: [],
  name: "Lilly Conner",
  username: "lilly",
  email: "lillyconner@renovize.com",
  phone: "+1 (842) 587-3812"
},
{
  _id: "7FkwE3etrB",
  balance: 1394.5,
  email: "doda@shli.com",
  phone: "+1 (842) 587-3812",
  name: "Doda Shli",
  username: "doda",
  transfers: [
    { to: "5a56640243427b8f8445231e", amount: 55, at: 1672177128142 },
    { from: "5a56640298ab77236845b82b", amount: 12, at: 167227712841 },
    { from: "5a56640298ab77236845b82b", amount: 0.4, at: 1672377128141 },
    { to: "5a56640298500fead8cb1ee5", amount: 20.3, at: 1672477128141 },
    { to: "5a566402f90ae30e97f990db", amount: 4, at: 1672177528141 },
    { to: "5a566402f90ae30e97f990db", amount: 230.4, at: 1653477128141 },
    { to: "5a566402abce24c6bfe4699d", amount: 230.4, at: 1672677623141 },
    { to: "5a566402f90ae30e97f990db", amount: 230.4, at: 1676897128141 },
    { to: "5a566402abce24c6bfe4699d", amount: 230.4, at: 1672677768141 },
    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677124121 },
    { to: "5a566402ed1cf349f0b47b4d", amount: 230.4, at: 1656977128141 },
    { to: "5a56640252d6acddd183d319", amount: 230.4, at: 1672624128141 },
    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677134711 },
    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677124211 },
    { to: "5a56640269f443a5d64b32ca", amount: 230.4, at: 1672677122451 },
    { to: "5a56640269f443a5d64b32ca", amount: 230.4, at: 1672543128141 },
    { to: "5a56640269f443a5d64b32ca", amount: 230.4, at: 1672677541141 },
    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677128141 },
    { from: "5a5664025c3abdad6f5e098c", amount: 4, at: 1672187128141 },
    { to: "5a56640208fba3e8ecb97305", amount: 6, at: 1672177928141 },
    { to: "5a5664029a8dd82a6178b15f", amount: 1, at: 1672177028141 },
    { from: "5a5664025c3abdad6f5e098c", amount: 0.6, at: 1671177128141 },
    { to: "5a566402a6499c1d4da9220a", amount: 6, at: 1673177128141 },
    { from: "5a566402abb3146207bc4ec5", amount: 2, at: 1672177128143 },
    { from: "5a5664028c096d08eeb13a8a", amount: 2, at: 1672154328143 },
    { from: "5a5664028c096d08eeb13a8a", amount: 2, at: 1672177143143 },
    { from: "5a566402abb3146207bc4ec5", amount: 2, at: 1673467128143 },
    { from: "5a56640272c7dcdf59c3d411", amount: 2, at: 1676437128143 },
    { from: "5a566402abb3146207bc4ec5", amount: 2, at: 1672177338143 },
    { from: "5a5664027bae84ef280ffbdf", amount: 2, at: 1672177163243 },
    { from: "5a5664027bae84ef280ffbdf", amount: 2, at: 1695177128143 },
    { from: "5a56640272c7dcdf59c3d411", amount: 2, at: 1672161128143 },
    { to: "5a56640298500fead8cb1ee5", amount: 12, at: 1674177128141 },
    { from: "5a566402e3b846c5f6aec652", amount: 465, at: 1675177128141 },
    { to: "5a566402e3b846c5f6aec652", amount: 45, at: 1676177128141 },
    { from: "5a5664029a8dd82a6178b15f", amount: 50.6, at: 1677177128141 },
    { from: "5a56640298ab77236845b82b", amount: 0.4, at: 1678177128141 },
    { to: "5a5664026c53582bb9ebe9d1", amount: 3.5, at: 1679177128141 },
    { to: "5a56640243427b8f8445231e", amount: 23.4, at: 1670177128141 },
    { to: "5a5664025f6ae9aa24a99fde", amount: 54, at: 1672177128144 },
    { from: "5a56640208fba3e8ecb97305", amount: 293, at: 1672177128145 },
    { to: "5a56640243427b8f8445231e", amount: 203, at: 1672177128141 },
    { from: "5a5664029a8dd82a6178b15f", amount: 3.4, at: 1672176128141 },
    { from: "5a56640243427b8f8445231e", amount: 34.4, at: 1672175128141 },
    { from: "5a56640298500fead8cb1ee5", amount: 103.5, at: 1672174128141 },
    { to: "5a5664025c3abdad6f5e098c", amount: 502.2, at: 1672173128141 },
    { to: "5a566402e3b846c5f6aec652", amount: 34, at: 1672172128141 },
    { to: "5a5664025c3abdad6f5e098c", amount: 69, at: 1672171128141 },
    { from: "5a566402a6499c1d4da9220a", amount: 93, at: 1672170128141 }]
}

]
localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(USERS))

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private authService = inject(AuthService)
  public userDB: User[] = USERS
  private _users$ = new BehaviorSubject<User[]>(this.userDB)
  public users$ = this._users$.asObservable()

  // public query(filterBy: { term: string, excludedIds: string[] }): void {
  // }

  public getById(id: string): Observable<User> {
    const user = this.userDB.find(anyUser => anyUser._id === id)
    return user
      ? of(user)
      : throwError(() => `User id:${id} not found`)
  }

  public remove(id: string): void {
    this.userDB = this.userDB.filter(anyUser => anyUser._id !== id)
    this._users$.next(this.userDB)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.userDB))
  }

  public save(user: User) {
    return user._id
      ? this._update(user)
      : this._add(user)
  }

  public transfer(user: User, amount: number, targetId: string) {
    if (user.balance < +amount || +amount <= 0) return user
    const target = this.userDB.find(anyUser => anyUser._id === targetId)
    if (!target) return user
    user.balance -= +amount
    user.transfers.push({ to: target._id, amount, at: Date.now() })
    target.balance += +amount
    if (!target.transfers) target.transfers = []
    target.transfers.push({ from: user._id, amount, at: Date.now() })
    this.save(user)
    this.save(target)
    return user
  }
  private _add(user: User) {
    if (this.userDB.find(anyUser => anyUser.username === user.username)) return null
    user._id = getRandomId()
    user.balance = 100
    user.transfers = []
    this.userDB.push(user)
    this._users$.next(this.userDB)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.userDB))
    return user
  }
  private _update(user: User) {
    if (this.userDB.find(anyUser => anyUser.username === user.username && anyUser._id !== user._id)) return null
    this.userDB = this.userDB.map(anyUser => anyUser._id !== user._id
      ? anyUser
      : user)
    this._users$.next(this.userDB)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.userDB))
    return user
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