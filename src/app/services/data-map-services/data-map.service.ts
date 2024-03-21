import { Injectable, Injector} from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class DataMapService {
  wmsUrl = 'http://localhost:8080/geoserver/adUcation/wms'
  layer = 'adUcation:Vietnam_Map_groupLayers'

  vietnamStTile = L.tileLayer.wms(this.wmsUrl,
    {
      layers: this.layer,
      format: 'image/png', // or any other supported format
      transparent: true, // if transparency is needed
      crs: L.CRS.EPSG3857,
    }
  );
}
