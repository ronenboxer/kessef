import { Component, inject, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { Transfer } from 'src/app/model/transfer.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  private bitcoinService = inject(BitcoinService)
  private authService = inject(AuthService)
  private contactService = inject(ContactService)

  user: User | null = null
  contacts: Contact[] = []
  rate: number = 1

  ngOnInit() {
    this.authService.loggedInUser$.subscribe(user => this.user = user)
    this.contactService.contacts$.subscribe(contacts => this.contacts = contacts)
    this.bitcoinService.rate$.subscribe(rate => this.rate = rate)
  }
}
