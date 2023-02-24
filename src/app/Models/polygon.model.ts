import { PolygonItem } from "./polygon.item.model";

export class Polygon{

  public id:number;
  public items:PolygonItem[];
  public createdAt:Date;
  public updatedAt?:Date;

  constructor(){
    this.id = new Date().getTime();
    this.items = [];
    this.createdAt = new Date();
  }

}
