import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/model/contact.model';
import { Transfer } from 'src/app/model/transfer.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { ContactService } from 'src/app/services/contact/contact.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  private bitcoinService = inject(BitcoinService)
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact!: Contact;
  user: User | null = null;
  transactions!: Transfer[];
  rate = 1;
  balance!: string

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact
      this.transactions = this.user?.transfers.filter(transfer => transfer.to === this.contact._id || transfer.from === this.contact._id) || []
    })
    this.authService.loggedInUser$.subscribe(user => {
      this.user = user
      this.balance = user!.balance.toLocaleString()
    })
    this.bitcoinService.rate$.subscribe(rate => this.rate = rate)
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  onDelete() {

  }

  onTransfer(form: NgForm) {
    const { amount } = form.value
    const { balance } = this.user!
    if (amount > +balance || +balance <= 0) return
    const user = this.userService.transfer({ ...this.user! }, amount, this.contact._id!)
    debugger
    this.authService.sign(user.username)
  }

  get initials() {
    return this.contact?.name?.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase() || ''
  }

  get url() {
    return `https://robohash.org/${this.contact?.name || ''}?set=set5`
  }
}
