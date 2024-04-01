import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as L from 'leaflet';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { MapTypeLists } from '../models/map-types';
import { DataMapService } from '../services/data-map-services/data-map.service';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss'],
})
export class DataMapComponent {
  map: any;

  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataMapService: DataMapService,
    public http: HttpClient,
    public mapTypesLists: MapTypeLists
  ) {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this._dataMapService.map = L.map('map').setView([20.048736, 105.89033], 7);
    this.map = this._dataMapService.map;
    L.control.scale({
      metric: true,
      maxWidth: 100,
      position: 'topright',
    })
    .addTo(this.map);

    // Map chính
    var WorldPhysicalMap = this.mapTypesLists.WorldPhysicalMap;

    //Google map layer
    var googleStreets = this.mapTypesLists.googleStreets;

    //Satellite layer
    var googleSat = this.mapTypesLists.googleSat;
    googleSat.addTo(this.map);

    //Layer Control
    var baseLayers = {
      'World Physical Map': WorldPhysicalMap,
      Satellite: googleSat,
      'Google Map': googleStreets,
    };

    // Coordinates
    this.map.on('mousemove', function (e: any) {
      var cnt = document.getElementById('cord');
      if (cnt) cnt.innerHTML = `Lat  ${e.latlng.lat}   Lng  ${e.latlng.lng}`;
    });
    this.map.on('click', function (e: any) {
      var cnt = document.getElementById('cord-point');
      if (cnt) cnt.innerHTML = `Lat  ${e.latlng.lat}   Lng  ${e.latlng.lng}`;
    });
  }
}
