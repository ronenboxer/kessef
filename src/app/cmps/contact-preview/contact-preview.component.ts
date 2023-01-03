import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent {
  @Input() contact!: Contact

  get initials(): string { return this.contact ? this.contact.name.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase() : '' }
  get url(): string { return this.contact ? `https://robohash.org/${this.contact.name}?set=set5` : '' }
}
