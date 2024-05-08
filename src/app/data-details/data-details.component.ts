import { Component, Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import { MessagesService } from '../services/message.service';

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


  displayOnMap = true;
  displayDetailsBody: any = {};
  displayBoxControl: any = {};
  displayRowCompare = false;
  countDetailsname: any = {};
  detailsName: any;
  disablePreviousDate = false;
  disableAfterDate = false;

  minDate = new Date("2022/02/13");
  maxDate = new Date();
  currentDate = new Date();

  lstStyles: any[] = [];
  selectedOption: string = "";

  constructor(
    public _dataMapService: DataMapService,
    public _dataDetailsService: DataDetailsService,
    public messageService: MessagesService,
  ) {}

  ngOnInit() {
    this.customDetailsBeforeInit();
  }

  customDetailsBeforeInit() {
    for(var x of this.lst_choosen) {
      x.currentDate = new Date(x.defaultDate);
      if(!this._dataDetailsService.opacityValue[x.tenData]) {
        this._dataDetailsService.opacityValue[x.tenData] = 100
      }

      this.maxDate = x.currentDate
      if(x.currentDate <= this.minDate) {
        this.disablePreviousDate = true;
      }
      if(x.currentDate >= this.maxDate) {
        this.disableAfterDate = true;
      }

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

  async hideShowDataMap(nameData: any, displayName: any) {
    var btn = document.getElementById('display-btn');
    if (btn) {
      if (this.displayOnMap) {
        btn.style.backgroundColor = 'white';
        this.displayOnMap = false;
        await this._dataMapService.RemoveDataFromMap(displayName);
      } else {
        btn.style.backgroundColor = '#002470';
        this.displayOnMap = true;
        this._dataMapService.AddDataToMap(nameData);
      }
    }
  }
  async removeAllDetails() {
    for(let x of this.lst_choosen) {
      await this._dataMapService.RemoveDataFromMap(x.displayName);
    }
    this.closeDetails.emit(false);
  }

  setOpacity(displayName: any) {
    this._dataMapService.SetOpacityForData(displayName, this._dataDetailsService.opacityValue[displayName] / 100);
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

   removeDetails(nameData: any, displayName: any) {
    for (let i = 0; i < this.lst_choosen.length; i++) {
      if (this.lst_choosen[i].tenData === nameData && this.lst_choosen[i].displayName === displayName) {
          this._dataMapService.RemoveDataFromMap(this.lst_choosen[i].displayName);
          this.lst_choosen.splice(i, 1);

          this.displayBoxControl[nameData] = false;
          this.countDetailsname[nameData] = false;

          break;
      }
    }
    if(this.lst_choosen.length === 0) {
      this.closeDetails.emit(false);
    }
  }

  // Date time
  getAbledDates(minDate: any, maxDate: any): Date[] {
    const disabledDates = [];

    // Loop from current date to minDate (exclusive)
    for (let d = new Date(minDate); d > minDate && d < maxDate; d.setDate(d.getDate() + 1)) {
        disabledDates.push(new Date(d));
    }

    return disabledDates;
  }
  getPreviousDate(minDate: Date, idData: any) {
      var btnFile = document.getElementsByClassName('p-datepicker-prev')[0];
      if (btnFile) {
        if (
          btnFile instanceof HTMLInputElement ||
          btnFile instanceof HTMLElement
        ) {
          btnFile.click();
        }
      }

  }
  getAfterDate(maxDate: Date, idData: any) {
    var btnFile = document.getElementsByClassName('p-datepicker-next')[0];
      if (btnFile) {
        if (
          btnFile instanceof HTMLInputElement ||
          btnFile instanceof HTMLElement
        ) {
          btnFile.click();
        }
      }
  }

  // Compare
  compare(nameData: any) {
    this.addCopyDataDetails(nameData);
  }

  addCopyDataDetails(nameData: any) {
    for(var x of this.lst_choosen) {
      if(x.tenData = nameData) {
        if(!this.countDetailsname[nameData]) {
          var obj = { ...x };
          this.countDetailsname[nameData] = true;
          obj.displayName = nameData + ` - Copy`;
          this._dataDetailsService.opacityValue[obj.displayName] = 100
          this.lst_choosen.push(obj);
          this._dataMapService.AddDataToMap(x.tenData);
          this.displayBoxControl[nameData] = false;
          this.displayRowCompare = true;
        }
        else {
          setTimeout(async () => {
            await this.messageService.addMessageDuplicate();
            this.displayBoxControl[nameData] = false;
          }, 500);
        }
        break;
      }
    }
  }
}
