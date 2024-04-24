import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const L: any; // --> Works
import 'leaflet';
import 'leaflet-timedimension';
import 'dist/leaflet-splitmap';
import 'dist/leaflet-simple-map-screenshoter'
import 'dist/leaflet.browser.print.min'
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { MapTypeLists } from '../models/map-types';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss'],
})
export class DataMapComponent {
  map: any;
  displayZoom: any;
  displayMapSetting = false;
  displayPrintScreenshot = false;
  displayPrintType = false;
  displayCityLabel = false;
  displayIconDelete: any = {};
  events2 = ["31/12/2020", "31/12/2021", "31/12/2022", "31/12/2023"];
  lat: any;
  lng: any;
  typeWorking: any = "NothingWorking";
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
    this._dataMapService.map = L.map('map',  {
      zoomControl: false,
      minZoom: 2,
    }).setView([20.048736, 105.89033], 6);
    this.map = this._dataMapService.map;
    //L.marker([20.048736, 105.89033]).addTo(this.map);

    this._dataMapService.InitialMapTileLayer();

    // Screenshoot
    this._dataMapService.screenshot();

    var browserControl = L.control.browserPrint({
      title: 'Just print me!',
      printLayer: this.map,
    }).addTo(this.map);

    // geosearch
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      retainZoomLevel: true,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false
      },

    });
    this.map.addControl(searchControl);


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
      if(this.typeWorking=="NothingWorking" || this.typeWorking=="CoordinatesWorking") { // Panel coordinates
        this.typeWorking = "CoordinatesWorking"; // đang =0 tức chưa bật panel, =1 là bật panel rồi

        //latitude
        var cord_lat = document.getElementById('point-lat');
        this.lat = this.customLatitudeValue(e.latlng.lat.toFixed(5));
        if (cord_lat) cord_lat.innerHTML = `${this.lat}`;

        //longtitude
        var cord_lng = document.getElementById('point-lng');
        this.lng = this.customLongtitudeValue(e.latlng.lng.toFixed(5));
        if (cord_lng) cord_lng.innerHTML = `${this.lng}`;
        console.warn(this.lat, this.lng);

        var name = e.target.options.name
        console.warn(name);
      }
      else if(this.typeWorking=="MeasureWorking") { // Line Measurements
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
    this.map.setView([20.048736, 105.89033], 6);
  }

  closePanel() {
    this.typeWorking="NothingWorking";
  }

  // Map settings
  openMapSetting() {
    this.displayMapSetting = true;
    this.displayPrintScreenshot = false;
  }
  closeMapSetting() {{
    this.displayMapSetting = false;
  }}
  openCloseCitiesLabel() {
    var btn = document.getElementById("btn-city-label");
    if(btn) {
      if(!this.displayCityLabel) {
        this.displayCityLabel = true;
        this._dataMapService.chooseDisplayCities();
        btn.style.backgroundColor = "#34b4eb";
        btn.style.border = "rgb(195, 144, 249)"
      }
      else {
        this.displayCityLabel = false;
        this._dataMapService.removeDisplayCities();
        btn.style.backgroundColor = "#496cf5"
      }
    }
  }

  // Print screenshot
  openPrintScreenshot() {
    this.displayPrintScreenshot = true;
    this.displayMapSetting = false;
  }
  closePrintScreenshot() {{
    this.displayPrintScreenshot = false;
  }}
  openClosePrintTypes() {
    if(!this.displayPrintType) {
      this.displayPrintType = true;
    }
    else {
      this.displayPrintType = false;
    }
  }
  async clickScreenShot() {
    var btnS = document.getElementsByClassName("leaflet-control-simpleMapScreenshoter-btn")[0];
    if (btnS) {
      if (btnS instanceof HTMLInputElement || btnS instanceof HTMLElement) {
        await btnS.click();
        this.displayPrintScreenshot = false;
      }
    }
  }
  async clickPrintLandscape() {
    var btnP = document.getElementsByClassName("browser-print-holder")[0];
    if (btnP) {
      if (btnP instanceof HTMLInputElement || btnP instanceof HTMLElement) {
        await btnP.click();
      }
    }
  }
  async clickPrintPortrait() {
    var btnP = document.getElementsByClassName("browser-print-holder")[1];
    if (btnP) {
      if (btnP instanceof HTMLInputElement || btnP instanceof HTMLElement) {
        await btnP.click();
      }
    }
  }
  async clickPrintAuto() {
    var btnP = document.getElementsByClassName("browser-print-holder")[2];
    if (btnP) {
      if (btnP instanceof HTMLInputElement || btnP instanceof HTMLElement) {
        await btnP.click();
      }
    }
  }
  async clickPrintCustom() {
    var btnP = document.getElementsByClassName("browser-print-holder")[3];
    if (btnP) {
      if (btnP instanceof HTMLInputElement || btnP instanceof HTMLElement) {
        await btnP.click();
      }
    }
  }

  // Measure
  openCloseMeasureDistance(type: any) {
    if(!this.displayIconDelete[type]) {
      this.displayIconDelete[type] = true;
      this.typeWorking = "MeasureWorking";
      var i = document.getElementById(`${type}`)
      if(i) {
        i.style.background = "#01d054";
      }
    }
    else {
      var i = document.getElementById(`${type}`)
      if(i) {
        i.style.background = "#496cf5";
      }
      this.displayIconDelete[type] = false;
      this.typeWorking = "NothingWorking";
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

  // Location user
  getCloseUserLocation(type: any) {
    if(!this.displayIconDelete[type]) {
      this.displayIconDelete[type] = true;
      this.typeWorking = "LocationWorking";
      var i = document.getElementById(`${type}`)
      if(i) {
        i.style.background = "#01d054";
      }
      this._dataMapService.locationUser();
      console.warn("haha");
    }
    else {
      var i = document.getElementById(`${type}`)
      if(i) {
        i.style.background = "#496cf5";
      }
      this.displayIconDelete[type] = false;
      this.typeWorking = "NothingWorking";
      this._dataMapService.removeLocate();
    }
  }

  // Compare
  openCloseCompareBox(type: any) {
    var t1 = this.mapTypesLists.googleStreets.addTo(this.map);
    var t2 = this.mapTypesLists.googleSat.addTo(this.map);
    var mp = L.control.splitMap(t1, t2)
    if(!this.displayIconDelete[type]) {
      this.displayIconDelete[type] = true;
      this.typeWorking = "";
      var i = document.getElementById(`${type}`)
      if(i) {
        i.style.background = "#01d054";
      }
      mp.addTo(this.map)
    }
    else {
      var i = document.getElementById(`${type}`)
      if(i) {
        i.style.background = "#496cf5";
      }
      this.displayIconDelete[type] = false;
      this.typeWorking = "NothingWorking";
      t1.remove();
      t2.remove();
      var mp_slider = document.getElementsByClassName('sbs-slider')[0];
      mp_slider.remove();
    }
  }

  // Timeline

  // Mouse move box-panel
  left = 500; // Initial horizontal position (in pixels)
  top = 60; // Initial vertical position (in pixels)

  isDragging = false;
  initialMouseX: any;
  initialMouseY: any;
  initialBoxLeft: any;
  initialBoxTop: any;

  onMouseDown(event: MouseEvent): void {
    // Begin dragging when the mouse button is pressed on the box-panel-info
    this.isDragging = true;
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
    this.initialBoxLeft = this.left;
    this.initialBoxTop = this.top;

    // Add mousemove and mouseup event listeners on the document
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    if (this.isDragging) {
      // Calculate new position based on mouse movement
      const deltaX = event.clientX - this.initialMouseX;
      const deltaY = event.clientY - this.initialMouseY;

      this.left = this.initialBoxLeft + deltaX;
      this.top = this.initialBoxTop + deltaY;
    }
  };

  onMouseUp = (): void => {
    // Stop dragging when the mouse button is released
    this.isDragging = false;

    // Remove the event listeners to avoid memory leaks
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

}
