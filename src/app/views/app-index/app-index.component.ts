import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss']
})
export class AppIndexComponent implements OnInit, OnDestroy {
  // constructor(private contactService: ContactService, private bitcoinService: BitcoinService) { }
  private contactService = inject(ContactService)
  private bitcoinService = inject(BitcoinService)
  private authService = inject(AuthService)

  ngOnInit() {
    this.authService.loggedInUser$.subscribe(user => {
      if (user?._id) this.contactService.filterBy = { excludedIds: [user._id], term: '' }
      this.contactService.query()
    })

    this.bitcoinService.query()
    this.bitcoinService.getRate()
  }

  ngOnDestroy(): void {
  }
}
