import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as L from 'leaflet';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { MapTypeLists } from '../services/map-services/map-type-lists.service';
import { DataMapService } from '../services/data-map-services/data-map.service';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss'],
})
export class DataMapComponent {
  urlLink: any;
  mapSave: any;
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
    var map = L.map('map').setView([20.048736, 105.89033], 7);
    var scaleControl = L.control
      .scale({
        metric: true,
        maxWidth: 100,
        position: 'topright',
      })
      .addTo(map);

    // Coordinates
    map.on('mousemove', function (e: any) {
      var cnt = document.getElementById('cord');
      if (cnt) cnt.innerHTML = `Lat  ${e.latlng.lat}   Lng  ${e.latlng.lng}`;
    });
    map.on('click', function (e: any) {
      var cnt = document.getElementById('cord-point');
      if (cnt) cnt.innerHTML = `Lat  ${e.latlng.lat}   Lng  ${e.latlng.lng}`;
    });

    // Map chính
    var WorldPhysicalMap = this.mapTypesLists.WorldPhysicalMap;

    //Google map layer
    var googleStreets = this.mapTypesLists.googleStreets;

    //Satellite layer
    var googleSat = this.mapTypesLists.googleSat;
    googleSat.addTo(map);

    //Layer Control
    var baseLayers = {
      'World Physical Map': WorldPhysicalMap,
      Satellite: googleSat,
      'Google Map': googleStreets,
    };

    var vietnamStTile = this._dataMapService.vietnamStTile;
    if(this._dataMapService.showLayerMap) {
      vietnamStTile.addTo(map);
    }
  }
  // async getUrlLink() {
  //   const res = (await this.getObject());
  //   this.urlLink = res.url;
  //   return this.urlLink;
  // }

  // async getObject() {
  //   return this.http.get<any>("https://localhost:7021/api/landsat").toPromise();
  // }
  OpenLayer() {
    if(this._dataMapService.showLayerMap) {
      console.warn(this._dataMapService.showLayerMap);
      var vietnamStTile = this._dataMapService.vietnamStTile;
      vietnamStTile.addTo(this.mapSave);
    }
  }

}
