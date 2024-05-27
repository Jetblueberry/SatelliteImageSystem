import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapTypeLists } from '../models/map-types';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { PreviewMapService } from '../services/preview-map-services/preview-map.service';

@Component({
  selector: 'app-preview-map',
  templateUrl: './preview-map.component.html',
  styleUrls: ['./preview-map.component.scss'],
})
export class PreviewMapComponent {
  map: any;
  constructor(
    public mapTypesLists: MapTypeLists,
    public _dataMapService: DataMapService,
    public _previewMapService: PreviewMapService
  ) {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this._previewMapService.map = L.map('preview', {
      zoomControl: false,
      dragging: false, // Disable dragging
      touchZoom: false, // Enable touch zoom, centered
      scrollWheelZoom: false,
      renderer: L.canvas(),
    }).setView([16, 106.9], 5);
    this.map = this._previewMapService.map;

    this._previewMapService.InitialMapPreview();

    // var myRenderer = L.canvas({ padding: 0.5 }).addTo(this.map);
    var line = L.polyline(
      [
        [23.5, 101.9],
        [23.5, 111.9],
        [8.5, 111.9],
        [8.5, 101.9],
        [23.5, 101.9],
      ],
      {color: "#349C66"}
    ).addTo(this.map);

    var zoomedIn = true;
    this.map.on('click', () => {
      if (zoomedIn) {
        this.map.flyTo([16, 106.9], 4, {
          animate: true,
          duration: 1.5,
        }); // Zoom out if already zoomed in
        zoomedIn = false;
      } else {
        this.map.flyTo([16, 106.9], 5, {
          animate: true,
          duration: 1.5,
        }); // Zoom in if not already zoomed in
        zoomedIn = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.map) {
        this.map.remove(); // Clean up the map
        this.map = null; // Clear the map reference
    }
}
}
