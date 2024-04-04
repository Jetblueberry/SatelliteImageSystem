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
  displayPanel = false;
  displayZoom: any;

  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataMapService: DataMapService,
    public http: HttpClient,
    public mapTypesLists: MapTypeLists
  ) {}

  ngOnInit() {
    this.initMap();
  }

  async initMap() {
    this._dataMapService.map = L.map('map', { zoomControl: false }).setView([20.048736, 105.89033], 7);
    this.map = this._dataMapService.map;

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

    // Scale
    L.control.scale({
      metric: true,
      maxWidth: 100,
      position: 'topright',
    })
    .addTo(this.map);

    // Coordinates
    this.map.on('mousemove', (e: any) => {
      //latitude
      var cord_lat = document.getElementById('cord-lat');
      const lat = this.customLatitudeValue(e.latlng.lat.toFixed(5));
      if (cord_lat) cord_lat.innerHTML = `${lat}`;

      //longtitude
      var cord_lng = document.getElementById('cord-lng');
      const lng = this.customLongtitudeValue(e.latlng.lng.toFixed(5));
      if (cord_lng) cord_lng.innerHTML = `${lng}`;

    });

    //Coordinate panel
    await this.map.on('click', (e: any) => {
      this.displayPanel = true;
       //latitude
       var cord_lat = document.getElementById('point-lat');
       const lat = this.customLatitudeValue(e.latlng.lat.toFixed(5));
       if (cord_lat) cord_lat.innerHTML = `${lat}`;

       //longtitude
       var cord_lng = document.getElementById('point-lng');
       const lng = this.customLongtitudeValue(e.latlng.lng.toFixed(5));
       if (cord_lng) cord_lng.innerHTML = `${lng}`;
       console.warn(lat, lng);
    });

  }

  customLatitudeValue(lat: any) {
    var direction = ""
    if(lat > 0) {
      direction = "°North";
    }
    else {
      direction = "°South";
    }
    return Math.abs(lat) + direction;
  }

  customLongtitudeValue(lng: any) {
    var direction = ""
    if(lng > 0) {
      direction = "°East";
    }
    else {
      direction = "°West";
    }
    return Math.abs(lng) + direction;
  }

  zoom_in() {
    this.map.zoomIn();
  }
  zoom_out() {
    this.map.zoomOut();
  }
}
