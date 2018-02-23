import { Injectable } from '@angular/core';
import { Contact } from './contact';

/*
* Service will keep and manage 5 stacks
* DEFAULT_CONTACTS - starting contacts for when application starts/is reset.
* current - list of contacts to be presented in app
* removed - list of contacts that have been recently removed and can be re-added to current
* actions - list of actions that have occured, actions are "add" or "remove"
* undoneContacts - list of contacts who were added into the stack just to be taken away
*/
@Injectable()
export class ContactService {
  //mock data for the smith/sanchez family
  private DEFAULT_CONTACTS : Contact[] = [
    new Contact("Rick", "Earth", "C-137", 1112223333, 5556667777),
    new Contact("Beth", null, "replacement", 1112224444, null),
    new Contact("Jerry", "Earth", "replacement", 1112225555, null),
    new Contact("Summer", "Earth", "replacement", 1112226666, 5556667777),
    new Contact("Morty", "Earth", "C-137", 1112227777, 5556667777)
  ];
  //initiate the current contact list with a copy of the default contacts
  private current : Contact[] = this.DEFAULT_CONTACTS.slice();
  private removed : Contact[] = [];
  //track wheter to undo/redo additions or removals
  private actions : string[] = [];
  private undoneActions : string[] = [];
  private undoneContacts : Contact[] = [];

  /*
  * Creates a new Contact instance given validated user input
  * @{returns} new Contact object
  */
  public makeContact(name: string, planet: string, dimension: string,
    mobile: number, home: number){
      let newContact = new Contact(name, planet, dimension, mobile, home);
      return newContact;
  };

  /*
  * Pushes new contact to the front of the current stack
  */
  public addContact(newContact: Contact){
    this.current.push(newContact);
    this.actions.push("add");
    console.log(JSON.stringify(this.current));
  };

  /*
  * Given a contact's id, the contact is removed from the current stack and added to the removed stack
  */
  public removeContact(id: string){
    let contact = this.current.find(contact => contact.getId() == id);
    if(contact){
      this.removed.push(contact);
      let ind = this.current.indexOf(contact);
      //remove this contact from the current list
      this.current.splice(ind,1);
      this.actions.push("remove");
    }
  };

  /*
  * Given a contact's id, update the given contact with the provided inputs
  */
  public updateContact(id: string, name: string, planet: string, dimension: string,
    mobile: number, home: number){
    let contact = this.current.find(contact => contact.getId() == id);
    if(contact){
      let i = this.current.indexOf(contact);
      //update each applicable param for the contact in the current stack
      this.current[i].setName(name);
      this.current[i].setPlanet(planet);
      this.current[i].setDimension(dimension);
      this.current[i].setMobile(mobile);
      this.current[i].setHome(home);
    };
  };

  /*
  * Checks the actions list and reverses the last action done,
  * it then adds that action to the undoneActions list for the redo functionality
  */
  public undoAction(){
    if(this.actions.length > 0){
      let action = this.actions.pop();
      if(action == "add"){
        //remove the last contact added to the current stack and add them to the front of the undoneContact stack
        let contact = this.current.pop();
        this.undoneContacts.push(contact);
        this.undoneActions.push(action);
      }
      else if(action == "remove"){
        //remove the last contact added to the removed stack and add them to the front of the current stack
        let contact = this.removed.pop();
        this.current.push(contact);
        this.undoneActions.push(action);
      }
    }
  };

  /*
  * Checks the undoneActions list and reverses the last undo done,
  * it then adds that action to the actions list for the undo functionality
  */
  public redoAction(){
    if(this.undoneActions.length > 0){
      let action = this.undoneActions.pop();
      if(action == "remove"){
        //remove the last contact added to the current stack and add them to the front of the removed stack
        let contact = this.current.pop();
        this.removed.push(contact);
        this.actions.push(action);
      }
      else if(action == "add"){
        //remove the last contact added to the undoneContacts stack and add them to the front of the current stack
        let contact = this.undoneContacts.pop();
        this.current.push(contact);
        this.actions.push(action);
      }
    }
  };

  //getters & setters
  public getCurrent(){
    return this.current;
  };

}
