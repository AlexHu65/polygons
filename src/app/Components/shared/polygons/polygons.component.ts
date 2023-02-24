import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PolygonItem } from 'src/app/Models/polygon.item.model';
import { Polygon } from 'src/app/Models/polygon.model';
import { PolygonsService } from 'src/app/Services/polygons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'polygons',
  templateUrl: './polygons.component.html',
  styleUrls: ['./polygons.component.css']
})
export class PolygonsComponent {

  public selectedPolygon:PolygonItem["id"];

  constructor(public polygonsService:PolygonsService){}

  deleteItem(item:PolygonItem){

    Swal.fire({
      title: '¿Desea borrar el poligono?',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Poligono eliminado', '', 'success');
        return this.polygonsService.deleteItem(item);
      }
    })

  }

  selectPoligon(id:number){
    this.selectedPolygon = id;
    this.polygonsService.selectPoligon(id);
  }
}
