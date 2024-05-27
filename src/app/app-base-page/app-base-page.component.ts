import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { MapTypeLists } from '../models/map-types';
import { DataDetailsService } from '../services/data-details-services/data-details.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './app-base-page.component.html',
  styleUrls: ['./app-base-page.component.scss']
})
export class AppBasePageComponent {
  openLeftMenu = true;

  constructor(
    public _datamapService: DataMapService,
    public _dataDetailsService: DataDetailsService,
    public mapTypesLists: MapTypeLists,
  ) {}



  async openHideLeftMenu() {
    var leftmenu = document.getElementById("app-left-menu");
    var maparea = document.getElementById("map-area");
    var btn = document.getElementById("control-leftmenu");
    var caret = document.getElementById("caret");

    if(leftmenu && maparea &&  btn && caret) {

      if(this.openLeftMenu) {

        leftmenu.style.width = "0px";
        leftmenu.style.transition = "width 0.5s ease";
        maparea.style.width = "100vw";
        maparea.style.transition = "width 0.5s ease";
        btn.style.left = "0px";
        btn.style.transition = "left 0.5s ease";
        caret.style.transform = "rotate(180deg)";
        caret.style.transition = "transform 0.5s ease";
        this._dataDetailsService.openSummary = false;
        setTimeout(async () => {
          await this._datamapService.onMapReady();
        }, 500)

        this.openLeftMenu = false;
      }
      else {
        leftmenu.style.width = "350px";
        leftmenu.style.transition = "width 0.5s ease";
        maparea.style.width = "calc(100vw - 350px)";
        maparea.style.transition = "width 0.5s ease";
        btn.style.left = "350px";
        btn.style.transition = "left 0.5s ease";
        caret.style.transform = "rotate(0deg)";
        caret.style.transition = "transform 0.5s ease";
        this._dataDetailsService.openSummary = true;
        setTimeout(async () => {
          await this._datamapService.onMapReady();
        }, 500)
        this.openLeftMenu = true;
      }

    }
  }


}
