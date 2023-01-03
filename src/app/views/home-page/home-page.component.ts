import { Component, inject, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { Transfer } from 'src/app/model/transfer.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private bitcoinService = inject(BitcoinService)
  private authService = inject(AuthService)
  private contactService = inject(ContactService)

  marketPrice$ = this.bitcoinService.marketPrice$
  // user$ = this.authService.loggedInUser$
  transactions: Transfer[] = []
  contacts: Contact[] = []
  rate: number = 1

  ngOnInit() {
    this.authService.loggedInUser$.subscribe(user => {
      this.transactions = user!.transfers!.length > 5
        ? user!.transfers.slice(-5)
        : user?.transfers
          ? user!.transfers
          : []
    })
    this.contactService.contacts$.subscribe(contacts => this.contacts = contacts)
    this.bitcoinService.rate$.subscribe(rate => this.rate = rate)
  }
}
