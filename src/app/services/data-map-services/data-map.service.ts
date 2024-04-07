import { Injectable, Injector} from '@angular/core';
import { WmsService } from '../wms.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class DataMapService {
  map: any;
  wmsUrl: any;
  defaultLayer: any = {}; // Khởi tạo layer dạng object dynamic

  displayZoom = true;

  constructor(public _wmsService: WmsService) {}

  // Ngay khi truyền Id dữ liệu vào, khởi tạo luôn layer
  InitialDataLayerByName(nameData: any) {
    this.wmsUrl = this._wmsService.wmsUrl;
    var layer = `Landsat_Workspace:${nameData}`;
    // layer = WP + (LC08_L2SP)
    this.defaultLayer[layer] = L.tileLayer.wms(this.wmsUrl,
      {
        layers: "LC08_L2SP_126045_20220408_20220412_02_T1",
        format: 'image/png', // or any other supported format
        transparent: true, // if transparency is needed
        crs: L.CRS.EPSG3857,
      }
    );
    return this.defaultLayer[layer];
  }

  // Khi đã khởi tạo layer rồi
  getDataLayerByName(nameData: any) {
    var layer = `Landsat_Workspace:${nameData}`;
    return this.defaultLayer[layer];
  }

  // Thêm layer vào bản đồ thì phải khởi tạo trc đã
  async AddDataToMap(nameData: any) {
    if (this.map) {
      await this.InitialDataLayerByName(nameData).addTo(this.map);
    }
  }

  // Xóa layer khỏi bản đồ khi đã khởi tạo rồi
  async RemoveDataFromMap(nameData: any) {
    if(this.map) {
      await this.getDataLayerByName(nameData).removeFrom(this.map);
    }
  }

  async SetOpacityForData(nameData: any, opacityValue: any) {
    if(this.map) {
      await this.getDataLayerByName(nameData).setOpacity(opacityValue);
    }
  }
}

//
