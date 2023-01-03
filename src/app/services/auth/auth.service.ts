import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserService } from '../user/user.service';

const LOGGED_IN_STORAGE_KEY = 'loggedInUser'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService = inject(UserService)
  private _loggedInUser: User | null = JSON.parse(sessionStorage.getItem(LOGGED_IN_STORAGE_KEY) as string) || null
  private _loggedInUser$ = new BehaviorSubject<User | null>(this._loggedInUser)
  public loggedInUser$ = this._loggedInUser$.asObservable()


  public sign(username: string | null = null) {
    const user = username
      ? this.userService.userDB.find(anyUser => anyUser.username === username) as User
      : null
    sessionStorage.setItem(LOGGED_IN_STORAGE_KEY, JSON.stringify(user || null))
    this._loggedInUser$.next(user)
    return user
  }

  checkLoggedIn() {
    return this._loggedInUser
  }
}
