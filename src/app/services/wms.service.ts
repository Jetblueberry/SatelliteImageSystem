import { Injectable, Injector} from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class WmsService {
  wmsUrl = 'http://localhost:8080/geoserver/Landsat_Workspace/wms';
  wmsLink = 'http://127.0.0.1:6969/wms';
  wmsUrlLandcover = 'http://localhost:8080/geoserver/Land_cover_workspace/wms';
}
