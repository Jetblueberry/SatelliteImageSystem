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
  displayOnMap = true;

  constructor(public _dataMapService: DataMapService) {}
  ngOnInit() {
    console.warn(this.opacityValue);
  }

  openSummary() {
    this.openCatalogue.emit(true);
  }

  hideShowDataMap() {
    var btn = document.getElementById("display-btn")
    if(btn) {
      if(this.displayOnMap) {
        btn.style.backgroundColor = "white";
        this.displayOnMap = false;
        this._dataMapService.RemoveDataFromMap();
      }
      else {
        btn.style.backgroundColor = "aqua";
        this.displayOnMap = true;
        this._dataMapService.AddDataToMap();
      }
    }
  }
  setOpacity() {
    this._dataMapService.SetOpacityForData(this.opacityValue/100);
  }
}
