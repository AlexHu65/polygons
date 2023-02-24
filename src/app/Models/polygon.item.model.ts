import { Coordinates } from "./coordinates.model";

export class PolygonItem{

  public id:number;
  public name:string;
  public center?:Coordinates;
  public description:string;
  public active:boolean;
  public selected:boolean;
  public coordinates:Coordinates[];
  public createdAt:Date;
  public updatedAt?:Date;

  constructor(name:string, description:string){
    this.id = new Date().getTime();
    this.name = name;
    this.description = description;
    this.active = true;
    this.coordinates = [];
    this.createdAt = new Date();
    this.selected = false;
  }

}
