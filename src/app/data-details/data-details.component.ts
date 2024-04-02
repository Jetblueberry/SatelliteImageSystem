import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';

@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.scss'],
})
export class DataDetailsComponent {
  @Input() lst_choosen: any;
  @Output() openCatalogue = new EventEmitter<any>();

  opacityValue = 100;
  displayOnMap = true;

  lstStyles: any[] = [];

  constructor(
    public _dataMapService: DataMapService,
    public _dataDetailsService: DataDetailsService
  ) {}

  ngOnInit() {
  }

  openSummary() {
    this.openCatalogue.emit(true);
  }

  async hideShowDataMap(nameData: any) {
    var btn = document.getElementById('display-btn');
    if (btn) {
      if (this.displayOnMap) {
        btn.style.backgroundColor = 'white';
        this.displayOnMap = false;
        await this._dataMapService.RemoveDataFromMap(nameData);
      } else {
        btn.style.backgroundColor = 'aqua';
        this.displayOnMap = true;
        this._dataMapService.AddDataToMap(nameData);
      }
    }
  }

  setOpacity(nameData: any) {
    this._dataMapService.SetOpacityForData(nameData, this.opacityValue / 100);
  }

  async genLstStyles(lst_Styles: any) {
    return await this._dataDetailsService.CustomListChosen(lst_Styles);
  }
}
