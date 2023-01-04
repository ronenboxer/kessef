import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
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
  private contactService = inject(ContactService)
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact!: Contact;
  contacts$ = this.contactService.contacts$
  user: User | null = null;
  transactions!: Transfer[];
  rate = 1;
  balance!: string
  amount: number|string = ''

  ngOnInit(): void {
    this.contacts$.subscribe(contacts => {
      this.contact = contacts.find(anyContact => anyContact._id === this.contact?._id) as Contact
    })
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact
      this.transactions = this.user?.transfers.filter(transfer => transfer.to === this.contact?._id || transfer.from === this.contact?._id) || []
    })
    this.authService.loggedInUser$.subscribe(user => {
      this.user = user
      this.balance = user!.balance.toLocaleString()
      this.transactions = this.user?.transfers.filter(transfer => transfer.to === this.contact?._id || transfer.from === this.contact?._id) || []
    })
    this.bitcoinService.rate$.subscribe(rate => this.rate = rate)
  }

  onDelete() {

    this.router.navigateByUrl('/contact')
  }

  onTransfer() {
    const { balance } = this.user!
    if (this.amount > +balance || +balance <= 0) return
    const user = this.userService.transfer({ ...this.user! }, +this.amount, this.contact?._id!)
    this.authService.sign(user.username)
    this.router.navigateByUrl('/contact/' + this.contact?._id)
    this.amount = ''
  }

  get initials() {
    return this.contact?.name?.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase() || ''
  }

  get url() {
    return `https://robohash.org/${this.contact?.name || ''}?set=set5`
  }
}
