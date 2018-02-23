import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  //placeholder to store input data for adding new contacts
  contactInfo = {
    name : null,
    planet : null,
    dimension : null,
    mobile : null,
    home : null
  };

  contacts : Contact[];

  constructor(private contactService: ContactService) { }

  //Populate the component's contacts list with the current stack
  getContacts(): void {
    this.contacts = this.contactService.getCurrent();
    console.log(JSON.stringify(this.contacts));
  };

  //Removes selected contact from current stack and updates list on ui
  removeContact(contact): void{
    this.contactService.removeContact(contact.getId());
    this.contacts = this.contactService.getCurrent();
  };

  //Takes a step back and reverses the most recent addition/deletion, then updates ui
  undoAction(): void{
    this.contactService.undoAction();
    this.contacts = this.contactService.getCurrent();
  };

  //jumps forward and negates the most recent undo-action, then updates ui
  redoAction(): void{
    this.contactService.redoAction();
    this.contacts = this.contactService.getCurrent();
  };

  //boolean flag for showing the add contact form on the ui
  private addFlag: boolean = false;

  //changes bool value of addFlag
  toggleAddFlag(): void{
    this.addFlag = !this.addFlag;
  };

  //makes a new contact with the given input data, adds the created contact to current stack, updates the ui
  addContact(): void{
    this.contactService.addContact(
      this.contactService.makeContact(this.contactInfo.name, this.contactInfo.planet,
                                    this.contactInfo.dimension, this.contactInfo.mobile, this.contactInfo.home)
    );
    this.contacts = this.contactService.getCurrent();
  };

  ngOnInit() {
    this.getContacts();
  }

}
