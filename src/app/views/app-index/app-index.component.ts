import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss']
})
export class AppIndexComponent implements OnInit, OnDestroy {
  // constructor(private contactService: ContactService, private bitcoinService: BitcoinService) { }
  contactService = inject(ContactService)
  bitcoinService = inject(BitcoinService)

  ngOnInit(): void {
    this.contactService.query()
    this.bitcoinService.query()
    this.bitcoinService.getRate()
  }

  ngOnDestroy(): void {
  }
}
