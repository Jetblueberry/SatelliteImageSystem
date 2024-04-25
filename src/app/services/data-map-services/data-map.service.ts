import { Injectable, Injector} from '@angular/core';
import { WmsService } from '../wms.service';
declare const L: any; // --> Works
import 'leaflet';
import { MapTypeLists } from 'src/app/models/map-types';
import { DataCatalogueService } from '../data-catalogue-services/data-catalogue.service';

@Injectable({
  providedIn: 'root',

})

export class DataMapService {
  map: any;
  wmsUrl: any;
  defaultLayer: any = {}; // Khởi tạo layer dạng object dynamic
  featureGroups: any = {};
  defaultMapType: any = false;
  marker: any;
  circle: any;

  displayZoom = true;

  constructor(
    public _wmsService: WmsService,
    public mapTypesLists: MapTypeLists,
    public _dataCatalogueService: DataCatalogueService,
  ) {}

  InitialMapTileLayer() {
    // Map chính
    var WorldPhysicalMap = this.mapTypesLists.WorldPhysicalMap;
    //Google map layer
    var googleStreets = this.mapTypesLists.googleStreets;
    //Satellite layer
    var googleSat = this.mapTypesLists.googleSat;
    var Esri_WorldImagery = this.mapTypesLists.Esri_WorldImagery;
    Esri_WorldImagery.addTo(this.map);
  }

  // Ngay khi truyền Id dữ liệu vào, khởi tạo luôn layer
  InitialDataLayerByName(nameData: any) {
    this.wmsUrl = this._wmsService.wmsUrl;
    var layer = `Landsat_Workspace:${nameData}`;

    if(!this.defaultLayer[nameData]) {
      this.defaultLayer[nameData] = L.tileLayer.wms(this.wmsUrl,
        {
          layers: layer,
          format: 'image/png', // or any other supported format
          transparent: true, // if transparency is needed
          crs: L.CRS.EPSG3857,
        }
      );
    }
    else {
      nameData = nameData + " - Copy"
      this.defaultLayer[nameData] = L.tileLayer.wms(this.wmsUrl,
        {
          layers: layer,
          format: 'image/png', // or any other supported format
          transparent: true, // if transparency is needed
          crs: L.CRS.EPSG3857,
        }
      );
    }
    //this.featureGroups[nameData] = L.featureGroup(this.defaultLayer[nameData]);

    return this.defaultLayer[nameData];
  }

  // Khi đã khởi tạo layer rồi
  getDataLayerByName(nameData: any) {
    return this.defaultLayer[nameData];
  }

  // Thêm layer vào bản đồ thì phải khởi tạo trc đã
  async AddDataToMap(nameData: any) {
    if (this.map) {
      await this.InitialDataLayerByName(nameData).addTo(this.map);
      console.warn(this._dataCatalogueService.choosen_lst)
    }
  }

  // Xóa layer khỏi bản đồ, vi da khoi tao roi nen khi xoa chi can goi ten layer de xoa
  async RemoveDataFromMap(nameData: any) {
    if(this.map) {
      console.warn(this.defaultLayer[nameData])
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
  chooseDisplayCities() {
    this.mapTypesLists.Stadia_StamenTerrainLabels.addTo(this.map).bringToFront();
  }
  removeDisplayCities() {
    this.mapTypesLists.Stadia_StamenTerrainLabels.removeFrom(this.map);
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

  // Location
  locationUser() {
    this.map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
    .on('locationfound', (e: any) => {
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            this.map.removeLayer(layer);
        }
      });
        this.marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
        this.circle = L.circle([e.latitude, e.longitude], {
            radius: 200,
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        this.marker.addTo(this.map)
        this.circle.addTo(this.map);
    })
   .on('locationerror', (e: any) => {
        console.log(e);
        alert("Location access denied.");
    });
  }

  removeLocate() {
    this.marker.removeFrom(this.map);
    this.circle.removeFrom(this.map);
    // Reset marker and circle variables
    this.map.setView([20.048736, 105.89033], 6);
    this.marker = null;
    this.circle = null;
    this.map.stopLocate()
  }


  // Compare
  addCompareLeftlayer(l_left: any) {
  }
  addCompareRightlayer(l_right: any) {
  }
  addCompareBothLayer(l_both: any) {
    var mp = L.control.splitMap(l_both, l_both);
  }
}


