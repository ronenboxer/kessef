import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
 private contactService = inject(ContactService)

contacts$!: Observable<Contact[]>

 ngOnInit(): void {
   this.contacts$ = this.contactService.contacts$
 }
}
