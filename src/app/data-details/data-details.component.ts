import { Component, Input,
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
  @Output() idDataSelected = new EventEmitter<any>();
  @Output() closeDetails = new EventEmitter<any>();

  opacityValue = 100;
  displayOnMap = true;
  displayDetailsBody: any = {};
  displayBoxControl: any = {};
  countDetailsName: any = {};
  detailsName: any;

  minDate = new Date("2022-02-13");

  lstStyles: any[] = [];
  selectedOption: string = "";

  constructor(
    public _dataMapService: DataMapService,
    public _dataDetailsService: DataDetailsService,
  ) {}

  ngOnInit() {
    this.customDetailsBeforeInit();
  }

  customDetailsBeforeInit() {
    for(var x of this.lst_choosen) {
      x.defaultDate = new Date(x.defaultDate);
    }
  }

  OpenCloseDetailsBody(type: any) {
    var i = document.getElementById(`${type}-icon`);
    if(i) {
      if(this.displayDetailsBody[type]) {
        this.displayDetailsBody[type] = false;
        i.style.transform = "rotate(0deg)";
        i.style.transition = "transform 0.3s ease";
      } else {
        this.displayDetailsBody[type] = true;
        i.style.transform = "rotate(-180deg)";
        i.style.transition = "transform 0.3s ease";
      }
    }
  }

  openSummary(idData: any) {
    this.openCatalogue.emit(true);
    this.idDataSelected.emit(idData);
    this._dataMapService.displayZoom = false;
  }

  async hideShowDataMap(nameData: any) {
    var btn = document.getElementById('display-btn');
    if (btn) {
      if (this.displayOnMap) {
        btn.style.backgroundColor = 'white';
        this.displayOnMap = false;
        await this._dataMapService.RemoveDataFromMap(nameData);
      } else {
        btn.style.backgroundColor = '#002470';
        this.displayOnMap = true;
        this._dataMapService.AddDataToMap(nameData);
      }
    }
  }
  async removeAllDetails() {
    for(let x of this.lst_choosen) {
      await this._dataMapService.RemoveDataFromMap(x.tenData);
    }
    this.closeDetails.emit(false);
  }

  setOpacity(nameData: any) {
    this._dataMapService.SetOpacityForData(nameData, this.opacityValue / 100);
  }

  genLstStyles(listStyles: any) {
    return this._dataDetailsService.CustomListChosen(listStyles);
  }

  // Box-view-control
  openBoxControl(nameData: any) {
    if(!this.displayBoxControl[nameData]) {
      this.displayBoxControl[nameData] = true;
    }
    else {
      this.displayBoxControl[nameData] = false;
    }
  }
  closeBoxControl(nameData: any) {
    this.displayBoxControl[nameData] = false;
  }

   removeDetails(nameData: any) {
    for (let i = 0; i < this.lst_choosen.length; i++) {
      if (this.lst_choosen[i].tenData === nameData) {
          this.lst_choosen.splice(i, 1);
          this._dataMapService.RemoveDataFromMap(nameData);
          this.displayBoxControl[nameData] = false;
          break;
      }
    }
    if(this.lst_choosen.length === 0) {
      this.closeDetails.emit(false);
    }
  }

  // Date time
  getDisabledDates(minDate: any): Date[] {
    const disabledDates = [];

    // Loop from current date to minDate (exclusive)
    for (let d = new Date(minDate); d < this.minDate; d.setDate(d.getDate() + 1)) {
        disabledDates.push(new Date(d));
    }

    return disabledDates;
}
}
