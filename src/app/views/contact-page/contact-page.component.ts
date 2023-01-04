import { Component, inject } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  private contactService = inject(ContactService)

  contacts$ = this.contactService.contacts$
  term = ''

  onSetFilter(ev: any): void {
    this.term = ev?.target?.value || ''
    this.contactService.filterBy = {...this.contactService.filterBy, term:this.term}
    this.contactService.query()
  }
}
