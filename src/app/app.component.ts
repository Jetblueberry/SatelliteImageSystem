import { Component } from '@angular/core';
import { DataMapService } from './services/data-map-services/data-map.service';
import * as L from 'leaflet'
import { MapTypeLists } from './models/map-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openLeftMenu = true;

  constructor(
    public _datamapService: DataMapService,
    public mapTypesLists: MapTypeLists
  ) {}

  openHideLeftMenu() {
    var leftmenu = document.getElementById("app-left-menu");
    var maparea = document.getElementById("map-area");

    var btn = document.getElementById("control-leftmenu");
    var caret = document.getElementById("caret");

    if(leftmenu && maparea &&  btn && caret) {
      if(this.openLeftMenu) {
        leftmenu.style.transition = "transform 0.8s ease";
        leftmenu.style.width = "0px";

        maparea.style.transition = "transform 0.8s ease";
        maparea.style.width = "100vw"
        btn.style.left = "0px";
        btn.style.transition = "transform 0.8s ease";
        caret.style.transform = "rotate(180deg)";
        caret.style.transition = "transform 0.8s ease";
        this._datamapService.onMapReady()
        this.openLeftMenu = false;
      }
      else {
        leftmenu.style.width = "350px";
        leftmenu.style.transition = "transform 0.8s ease";
        maparea.style.width = "calc(100vw - 350px)";
        maparea.style.transition = "transform 0.8s ease";
        btn.style.left = "350px";
        btn.style.transition = "transform 0.8s ease";
        caret.style.transform = "rotate(0deg)";
        caret.style.transition = "transform 0.8s ease";
        this._datamapService.onMapReady()
        this.openLeftMenu = true;
      }

    }
  }
}
