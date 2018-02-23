import { v5 as uuid } from 'uuid';

export class Contact {
  private name : string;
  private planet : string;
  private dimension : string;
  private mobile : number;
  private home : number;
  private id : string;

  //the name property will be required, everything else can be undefined/null
  constructor(newName: string, newPlanet: string, newDimension: string,
    newMobile: number, newHome: number){
      this.name = newName;
      this.planet = newPlanet;
      this.dimension = newDimension;
      this.mobile = newMobile;
      this.home = newHome;
      //generate a unique identifier
      this.id = uuid();
  };

  //getters & setters
  public getName(){
    return this.name;
  };
  public getPlanet(){
    return this.planet;
  };
  public getDimension(){
    return this.dimension;
  };
  public getMobile(){
    return this.mobile;
  };
  public getHome(){
    return this.home;
  };
  public getId(){
    return this.id;
  };

  public setName(newName: string){
    this.name = newName;
  };
  public setPlanet(newPlanet: string){
    this.planet = newPlanet;
  };
  public setDimension(newDimension: string){
    this.dimension = newDimension;
  };
  public setMobile(newMobile: number){
    this.mobile = newMobile;
  };
  public setHome(newHome: number){
    this.home = newHome;
  };
}
