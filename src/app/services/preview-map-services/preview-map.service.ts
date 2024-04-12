import { Injectable, Injector} from '@angular/core';
import { WmsService } from '../wms.service';
import * as L from 'leaflet';
import { MapTypeLists } from 'src/app/models/map-types';

@Injectable({
  providedIn: 'root',
})

export class PreviewMapService {
  map: any;

  constructor(public mapTypesLists: MapTypeLists){}
  InitialMapPreview() {

    var Esri_WorldGrayCanvas = this.mapTypesLists.Esri_WorldGrayCanvas;
    Esri_WorldGrayCanvas.addTo(this.map);
  }
}
