import { AfterViewInit, Component, SimpleChange } from '@angular/core';
import { Config } from 'src/app/Configs/app.config';
import { Polygon } from 'src/app/Models/polygon.model';
import { PolygonItem } from 'src/app/Models/polygon.item.model';
import { PolygonsService } from 'src/app/Services/polygons.service';
import { IVertices } from 'src/app/Interfaces/IVertices';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{


  public adding:boolean = false;
  public del:boolean = false;
  public errors:boolean = false;
  public errorsMsg:string = '';
  public polygonName:string;
  public polygonDescription:string;
  public polygonList:Polygon;
  public vertices:IVertices;
  public search:string = '';

  constructor(
    public config:Config,
    public polygonService:PolygonsService
  ){

    this.polygonName = '';
    this.polygonDescription = '';
    this.polygonList = this.polygonService.loadStorage();

  }


  enableAdd(){
    this.adding = true;
  }

  saveItemPolygon(){

    if(this.polygonName == '' || this.polygonDescription == ''){

      this.errors = true;

      if(this.polygonName == ''){
        this.errorsMsg = 'Error en el campo nombre.';
      }

      if (this.polygonDescription == '') {
        this.errorsMsg = 'Error en el campo de descripción.';
      }

      return;
    }

    // Validamos que existen coordenadas
    if(!this.vertices){
      this.errors = true;
      this.errorsMsg = 'Por favor, dibuje el poligono para continuar.';
      return;
    }

    let item = new PolygonItem(this.polygonName, this.polygonDescription);

    //Agregamos el poligono

    item.center = this.vertices.center;

    item.coordinates = this.vertices.coordinates;

    this.polygonService.addItem(item);

    this.adding = false;

    this.polygonName = '';

    this.polygonDescription = '';

    this.vertices = null;

    this.errorsMsg = '';

    this.errors = false;
  }

  receivesPolygon(e:IVertices){
    this.vertices = e;
  }

  searchPolygon(){
    this.polygonService.searchPoligon(this.search);
  }

}
