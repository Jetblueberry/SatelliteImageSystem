import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapTypeLists } from '../models/map-types';
import { DataMapService } from '../services/data-map-services/data-map.service';

@Component({
  selector: 'app-preview-map',
  templateUrl: './preview-map.component.html',
  styleUrls: ['./preview-map.component.scss'],
})
export class PreviewMapComponent {
  map: any;
  constructor(
    public mapTypesLists: MapTypeLists,
    public _dataMapService: DataMapService
  ) {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('preview').setView([20.048736, 105.89033], 7);

    L.control
      .scale({
        metric: true,
        maxWidth: 100,
        position: 'topright',
      })
      .addTo(this.map);
    var googleSat = this.mapTypesLists.WorldPhysicalMap;
    googleSat.addTo(this.map);
  }
}
