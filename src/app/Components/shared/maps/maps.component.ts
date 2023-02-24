import { Component, AfterViewInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { MapLoaderService } from './map.loader';
import { IVertices } from '../../../Interfaces/IVertices';
import { PolygonsService } from 'src/app/Services/polygons.service';
import Swal from 'sweetalert2';
import { Coordinates } from 'src/app/Models/coordinates.model';
import { PolygonItem } from 'src/app/Models/polygon.item.model';

declare var google: any;

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit {

  @Output() cordinates = new EventEmitter<any>();

  @Input() add = false;

  public editMode:boolean = false;

  public deleted:boolean = false;

  public selectedPolygonId:number | null;

  public selectedItem:PolygonItem;

  // Map
  private map:any;
  private drawingManager: any;
  private center:Coordinates = { lat: 19.697608, lng: -101.1972351 };
  private zoom:number = 15;

  constructor(public polygonService:PolygonsService) {}

  ngAfterViewInit() {

    MapLoaderService.load().then(() => {
      this.drawPolygon();
    });

    //Borrar poligono
    this.polygonService.deleteEvent.subscribe(e => {
      if(e){
        MapLoaderService.load().then(() => {
          this.drawPolygon();
        });
      }
    });

    //Seleccionar poligono y centrarlo
    this.polygonService.selectedEvent.subscribe(e => {
      if(e.center){
        this.selectedPolygonId = e.id;
        this.selectedItem = e;
        this.center = e.center;
        this.zoom = 15;
        MapLoaderService.load().then(() => {
          this.drawPolygon();
        });
      }
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {

    let mode: SimpleChange = changes['add'];

    this.editMode =  mode.currentValue;

    MapLoaderService.load().then(() => {
      this.drawPolygon();
    });
  }

  drawPolygon() {

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: this.zoom,
    });

    let savedVertices = [];

    savedVertices = (this.polygonService.polygonList.items.map( (item) => {
      if(item.active){
        return Array.from(item.coordinates);
      }
      return Array();
    }));

    //Marcador para el seleccionado
    this.polygonService.polygonList.items.map( (item) => {
      if(this.selectedPolygonId == item.id){
        let markers = new google.maps.Marker({
          position: item.coordinates[0],
          title: item.name,
          icon: '../assets/icons/icons8-map-marker-48.png',
        });

        const infowindow = new google.maps.InfoWindow({
          content: item.name,
          ariaLabel: item.name,
        });

        google.maps.event.addListener(markers, 'click', function() {
          infowindow.open(this.map,markers);
        });

        markers.setMap(this.map);
      }
    })


    // Crear los polygonos
    let polygons = new google.maps.Polygon({
      paths: savedVertices,
      strokeColor: "red",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "red",
      fillOpacity: 0.35,
    });

    // Manager de dibujo
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: (this.editMode ? google.maps.drawing.OverlayType.POLYGON : null),
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon'],
      },
    });


    polygons.setMap(this.map);

    this.drawingManager.setMap(this.map);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      // Polygon drawn
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {

        let data:IVertices = {
          center: this.map.getCenter(),
          coordinates: event.overlay.getPath().getArray()
        }

        this.cordinates.emit(data);
      }

    });

  }

}
