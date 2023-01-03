import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User | null = null
  private authService = inject(AuthService)
  private router = inject(Router)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    this.authService.loggedInUser$.subscribe(user => this.user = user)
    if (this.user) return true
    this.router.navigateByUrl('/sign')
    return false
  }

}
