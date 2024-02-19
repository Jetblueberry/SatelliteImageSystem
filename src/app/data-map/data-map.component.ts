import { Component } from '@angular/core';
import * as L from 'leaflet';
import { DataMapService } from '../services/data-map-services/data-map.service';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss']
})
export class DataMapComponent {

  constructor(
    public _dataMapService: DataMapService,
  ) {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    var map = L.map('map').setView([20.048736, 105.890330], 7);
    var scaleControl = L.control.scale({
      metric: true,
      maxWidth: 100,
      position: "topright",
    }).addTo(map);

    // Coordinates
    map.on('mousemove', function(e: any) {
      var cnt = document.getElementById("cord");
      if(cnt)
      cnt.innerHTML = `Lat  ${e.latlng.lat}   Lng  ${e.latlng.lng}`
    })

    // OSM layer
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
    // osm.addTo(map);


    var WorldPhysicalMap = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	      attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	      maxZoom: 8
      });
      WorldPhysicalMap.addTo(map); // Map chính

    //Google map layer
    var googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    //Satellite layer
    var googleSat = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    //Layer Control
    var baseLayers = {
      'World Physical Map': WorldPhysicalMap,
      Satellite: googleSat,
      'Google Map': googleStreets,
    };
    L.control.layers(baseLayers).addTo(map);


  }
}
