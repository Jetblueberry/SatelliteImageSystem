import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {

  constructor(
    public _dataMapCatalogue: DataMapService,
  ) {}
  openCatalogue() {
    this._dataMapCatalogue.showCatalogue = true;
  }
}
