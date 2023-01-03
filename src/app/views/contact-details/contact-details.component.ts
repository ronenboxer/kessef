import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  contact!: Contact

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => this.contact = contact)
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  onDelete(){

  }

  get initials() {
    return this.contact?.name?.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase() || ''
  }

  get url() {
    return `https://robohash.org/${this.contact?.name || ''}?set=set5`
  }
}
