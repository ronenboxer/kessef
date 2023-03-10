import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { Transfer } from '../../model/transfer.model'

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions!: Transfer[];
  @Input() contacts!: Contact[];
  @Input() rate!: number;
  title = '';

  ngOnInit(): void {
    this.title = this.transactions?.length
      ? this.transactions.length + ' last transactions'
      : 'No transactions yet';
  }

  getTarget(transaction:Transfer) {
    return this.contacts.find(contact => contact._id === transaction[(transaction.to ? 'to' : 'from')]);
  }
}
