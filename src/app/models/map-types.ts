import * as L from 'leaflet';

export class MapTypeLists {
  WorldPhysicalMap = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; Source: US National Park Service',
      maxZoom: 8,
    }
  );

  //Google map layer
  googleStreets = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }
  );

  //Satellite layer
  googleSat = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }
  );

  Stadia_StamenTonerBackground = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.{ext}', {
	  minZoom: 0,
	  maxZoom: 20,
	  attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

  });
}
