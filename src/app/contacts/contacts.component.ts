import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts : Contact[];

  constructor(private contactService: ContactService) { }

  /*
  * Populate the component's contacts list with the current stack
  */
  getContacts(): void {
    this.contacts = this.contactService.getCurrent();
  }

  ngOnInit() {
    this.getContacts();
  }

}
