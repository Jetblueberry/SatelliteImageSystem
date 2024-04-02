import { Injectable, Injector} from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class DataMapService {
  map: any;
  wmsUrl = 'http://localhost:8080/geoserver/Landsat_Workspace/wms'
  defaultLayer: any = {}; // Khởi tạo layer dạng object dynamic

  ngOnInit() {}

  // Ngay khi truyền Id dữ liệu vào, khởi tạo luôn layer
  InitialDataLayerByName(nameData: any) {
    var layer = `Landsat_Workspace:${nameData}`;

    this.defaultLayer[layer] = L.tileLayer.wms(this.wmsUrl,
      {
        layers:layer,
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
