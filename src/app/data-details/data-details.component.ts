import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';


@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.scss']
})
export class DataDetailsComponent {
  @Input() lst_choosen: any;
  @Output() openCatalogue = new EventEmitter<any>;

  opacityValue = 100;

  constructor(public _dataMapService: DataMapService) {}
  ngOnInit() {
    console.warn(this.opacityValue);
  }

  openSummary() {
    this.openCatalogue.emit(true);
  }

  hideDataMap() {
    this._dataMapService.RemoveDataFromMap();
  }
  showDataMap() {
    this._dataMapService.AddDataToMap();
  }
  setOpacity() {
    this._dataMapService.SetOpacityForData(this.opacityValue/100);
  }
}
