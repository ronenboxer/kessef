import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'user-sign',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.scss']
})
export class UserSignComponent implements OnInit {

  private userService = inject(UserService)
  private authService = inject(AuthService)
  private router = inject(Router)
  state = 'signin'

  ngOnInit() {
    if (this.authService.checkLoggedIn()) this.router.navigateByUrl('/')
  }

  switchState(state = 'signin') { this.state = state }

  onSign(form: NgForm) {
    let user = null
    if (this.state === 'signup') {
      user = this.userService.save(form.value)
      if (!user) return
    }
    if (this.authService.sign(form.value.username)) this.router.navigateByUrl('/')
  }
}
