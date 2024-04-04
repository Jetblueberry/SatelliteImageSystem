import { Injectable, Injector} from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class WmsService {
  wmsUrl = 'http://localhost:8080/geoserver/Landsat_Workspace/wms';
}
