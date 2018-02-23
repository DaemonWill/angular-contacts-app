import { Injectable } from '@angular/core';
import { Contact } from './contact';

/*
* Service will keep and manage 4 stacks
* DEFAULT_CONTACTS - starting contacts for when application starts/is reset.
* current - list of contacts to be presented in app
* removed - list of contacts that have been recently removed and can be re-added to current
* actions - list of actions that have occured, actions are "add" or "remove"
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
  private  current : Contact[] = [];
  private  removed : Contact[] = [];
  //track wheter to undo/redo additions or removals
  private  actions : string[] = [];
  private  undoneActions : string[] = [];

  /*
  * Creates a new Contact instance given validated user input
  * @{returns} new Contact object
  */
  public makeContact(name: string, planet: string, dimension: string,
    mobile: number, home: number){
      let newContact: Contact = new Contact(name, planet, dimension, mobile, home);
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
  * Checks the actions list and reverses the last action done,
  * it then adds that action to the undoneActions list for the redo functionality
  */
  public undoAction(){
    if(this.actions.length > 0){
      let action = this.actions.pop();
      if(action == "add"){
        //remove the last contact added to the current stack and add them to the front of the removed stack
        let contact = this.current.pop();
        this.removed.push(contact);
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
        //remove the last contact added to the removed stack and add them to the front of the current stack
        let contact = this.removed.pop();
        this.current.push(contact);
        this.actions.push(action);
      }
    }
  };

  //getters & setters
  public getCurrent(){
    //assign a clone of defaultContacts to current if no contacts were ever registered
    if(this.current.length == 0 && this.actions.length == 0){
      this.current = this.DEFAULT_CONTACTS.slice();
    }
    return this.current;
  };

}
