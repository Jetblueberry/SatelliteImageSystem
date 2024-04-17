import { Injectable, Injector} from '@angular/core';
import { WmsService } from '../wms.service';
declare const L: any; // --> Works
import 'leaflet';
import { MapTypeLists } from 'src/app/models/map-types';

@Injectable({
  providedIn: 'root',

})

export class DataMapService {
  map: any;
  wmsUrl: any;
  defaultLayer: any = {}; // Khởi tạo layer dạng object dynamic
  defaultMapType: any = false;

  displayZoom = true;

  constructor(public _wmsService: WmsService, public mapTypesLists: MapTypeLists) {}

  InitialMapTileLayer() {
    // Map chính
    var WorldPhysicalMap = this.mapTypesLists.WorldPhysicalMap;

    //Google map layer
    var googleStreets = this.mapTypesLists.googleStreets;

    //Satellite layer
    var googleSat = this.mapTypesLists.googleSat;

    var Esri_WorldImagery = this.mapTypesLists.Esri_WorldImagery;
    Esri_WorldImagery.addTo(this.map);

    //var browserControl = L.control.browserPrint().addTo(this.map);
    // if(Esri_WorldImagery)
    // var tdWmsLayer = L.timeDimension.layer.wms(Esri_WorldImagery);
    // if(tdWmsLayer)
    // tdWmsLayer.addTo(this.map);
  }

  // Ngay khi truyền Id dữ liệu vào, khởi tạo luôn layer
  InitialDataLayerByName(nameData: any) {
    this.wmsUrl = this._wmsService.wmsUrl;
    var layer = `Landsat_Workspace:${nameData}`;

    this.defaultLayer[layer] = L.tileLayer.wms(this.wmsUrl,
      {
        layers: nameData,
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

  // Xóa layer khỏi bản đồ, vi da khoi tao roi nen khi xoa chi can goi ten layer de xoa
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
  async onMapReady() {
    await this.map.invalidateSize();
  }

  // Chọn loại bản đồ
  chooseDefaultMap() {
    this.mapTypesLists.WorldPhysicalMap.remove();
    this.mapTypesLists.CartoDB_Positron.remove();
    this.mapTypesLists.CartoDB_DarkMatter.remove();
    this.mapTypesLists.Esri_WorldImagery.addTo(this.map).bringToBack();
  }
  chooseWorldPhysicalMap() {
    this.mapTypesLists.Esri_WorldImagery.remove();
    this.mapTypesLists.CartoDB_Positron.remove();
    this.mapTypesLists.CartoDB_DarkMatter.remove();
    this.mapTypesLists.WorldPhysicalMap.addTo(this.map).bringToBack();
  }
  choosePositronMap() {
    this.mapTypesLists.Esri_WorldImagery.remove();
    this.mapTypesLists.WorldPhysicalMap.remove();
    this.mapTypesLists.CartoDB_DarkMatter.remove();
    this.mapTypesLists.CartoDB_Positron.addTo(this.map).bringToBack();
  }
  chooseDarkmatterMap() {
    this.mapTypesLists.Esri_WorldImagery.remove();
    this.mapTypesLists.WorldPhysicalMap.remove();
    this.mapTypesLists.CartoDB_Positron.remove();
    this.mapTypesLists.CartoDB_DarkMatter.addTo(this.map).bringToBack();
  }

  // Screenshot
  screenshot() {
    let pluginOptions = {
      cropImageByInnerWH: true, // crop blank opacity from image borders
      hidden: false, // hide screen icon
      preventDownload: false, // prevent download on button click
      domtoimageOptions: {}, // see options for dom-to-image
      position: 'topleft', // position of take screen icon
      screenName: 'screen', // string or function
      hideElementsWithSelectors: ['.leaflet-control-container'], // by default hide map controls All els must be child of _map._container
      mimeType: 'image/png', // used if format == image,
      caption: null, // string or function, added caption to bottom of screen
      captionFontSize: 15,
      captionFont: 'Arial',
      captionColor: 'black',
      captionBgColor: 'white',
      captionOffset: 5,
      // callback for manually edit map if have warn: "May be map size very big on that zoom level, we have error"
      // and screenshot not created
   }

   var simpleMapScreenshoter = L.simpleMapScreenshoter(pluginOptions).addTo(this.map)
   let format = 'blob' // 'image' - return base64, 'canvas' - return canvas
   let overridedPluginOptions = {
     mimeType: 'image/jpeg'
   }
   simpleMapScreenshoter.takeScreen(format, overridedPluginOptions)
  }
}


