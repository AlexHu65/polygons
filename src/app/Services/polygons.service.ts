import { Polygon } from '../Models/polygon.model';
import { EventEmitter, Injectable } from '@angular/core';
import { PolygonItem } from '../Models/polygon.item.model';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PolygonsService {

  public polygonList:Polygon = new Polygon();

  public deleteEvent = new EventEmitter<boolean>();
  public selectedEvent = new EventEmitter<PolygonItem>();

  constructor(public mapService:MapService){
    this.loadStorage();
  }

  deleteItem(item:PolygonItem){
    this.polygonList.items = this.polygonList.items.filter(obj => obj.id !== item.id);
    this.deleteEvent.emit(true);
    this.saveStorage();
  }

  addItem(item: PolygonItem){
    this.polygonList.items.push(item);
    this.saveStorage();
  }

  saveStorage(){
    localStorage.setItem('polygon', JSON.stringify(this.polygonList));
  }

  selectPoligon(id:number){
    let polygon = this.polygonList.items.find( listaData =>  listaData.id === id);
    this.selectedEvent.emit(polygon);
  }

  searchPoligon(search:string){
    this.loadStorage();
    const found = this.polygonList.items.filter( item  => item.name.toLowerCase().match(search.toLowerCase()));
    this.polygonList.items = found;
  }


  /*Carga la lista de polygonos guardada*/
  loadStorage(){

    if(localStorage.getItem('polygon')){
      const local = localStorage.getItem('polygon') || '';

      if(local !== ''){
        this.polygonList = JSON.parse(local);
      }
    }

    return this.polygonList;
  }
}
