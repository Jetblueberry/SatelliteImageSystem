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
  displayZoom: any;
  displayMapSetting = false;
  displayIconDelete = false;
  events2 = ["31/12/2020", "31/12/2021", "31/12/2022", "31/12/2023"];
  lat: any;
  lng: any;
  LineMeasuring = 0;
  markers: any[] = [] ;
  lines: any[] = [];
  totalDistance = 0;

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
    this._dataMapService.map = L.map('map', { zoomControl: false }).setView([20.048736, 105.89033], 6);
    this.map = this._dataMapService.map;
    L.marker([20.048736, 105.89033]).addTo(this.map);

    this._dataMapService.InitialMapTileLayer();

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

    // Panel
    await this.map.on('click', (e: any) => {
      if(this.LineMeasuring==0 || this.LineMeasuring==1) { // Panel coordinates
        this.LineMeasuring = 1; // đang =0 tức chưa bật panel, =1 là bật panel rồi

        //latitude
        var cord_lat = document.getElementById('point-lat');
        this.lat = this.customLatitudeValue(e.latlng.lat.toFixed(5));
        if (cord_lat) cord_lat.innerHTML = `${this.lat}`;

        //longtitude
        var cord_lng = document.getElementById('point-lng');
        this.lng = this.customLongtitudeValue(e.latlng.lng.toFixed(5));
        if (cord_lng) cord_lng.innerHTML = `${this.lng}`;
        console.warn(this.lat, this.lng);
      }
      else if(this.LineMeasuring==2) { // Line Measurements
        const newMarker = L.marker([e.latlng.lat, e.latlng.lng]);

        newMarker.addTo(this.map);

        if (this.markers.length > 0) {
          const lastMarker = this.markers[this.markers.length - 1];
          const lastLatLng = lastMarker.getLatLng();

          // line between coordinates
          const lineCoordinates = [lastLatLng, e.latlng];
          var lineBetween = L.polyline(lineCoordinates, { color: 'blue' }).addTo(this.map);
          this.lines.push(lineBetween);
          // Calculate the distance from the last marker to the new marker
          const distanceBetween = lastLatLng.distanceTo(e.latlng);

          //Total distance
          this.totalDistance+=distanceBetween;
          // Print the distance to the console
          console.warn(this.totalDistance);
        }
        // Add the new marker to the markers array
        this.markers.push(newMarker);

      }
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

  customTotalDistance(distance: any) {
    var d = Math.abs(distance/1000).toFixed(2);
    return d + " km";
  }

  zoom_in() {
    this.map.zoomIn();
  }
  zoom_out() {
    this.map.zoomOut();
  }
  set_zoom_home() {
    this.map.setView([20.048736, 105.89033], 7);
  }

  closePanel() {
    // var box = document.getElementById("box-panel-info");
    // if(box) box.style.zIndex = "-10";
    this.LineMeasuring=0;
  }

  // Map settings
  openMapSetting() {
    this.displayMapSetting = true;
  }
  closeMapSetting() {{
    this.displayMapSetting = false;
  }}

  // Measure
  openCloseDeleteIcon() {
      if(!this.displayIconDelete) {
        this.displayIconDelete = true;
        this.LineMeasuring = 2;
        var i = document.getElementById("box-linemeasure")
        if(i) {
          i.style.background = "#01d054";
        }
      }
      else {
        var i = document.getElementById("box-linemeasure")
        if(i) {
          i.style.background = "#496cf5";
        }
        this.displayIconDelete = false;
        this.LineMeasuring = 0;
        this.removeMarkers();
      }
  }

  removeMarkers() {
    this.markers.forEach((marker) => {
      marker.removeFrom(this.map);
    });
    this.markers = [];
    this.lines.forEach((line) => {
      line.removeFrom(this.map);
    })
    this.lines = [];
    this.totalDistance = 0;
  }
}
