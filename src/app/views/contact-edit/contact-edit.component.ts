import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  form!: FormGroup;
  contact!: Contact;

  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact || this.contactService.new()
      this.form = this.fb.group(contact)
    })
  }

  async onSaveContact() {
    this.contact = await lastValueFrom(this.contactService.save({...this.contact, ...this.form.value}));
    this.router.navigateByUrl('/contact/'+ this.contact._id)
  }

  onBack() {
    this.location.back();
  }
  get initials() {
    console.log(`this.contact?.name?.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase()`, this.contact?.name?.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase())
    return this.contact?.name?.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase() || ''
  }

  get url() {
    return `https://robohash.org/${this.contact?.name || ''}?set=set5`
  }
}
