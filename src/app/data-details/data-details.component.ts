import { Component, Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import { MessagesService } from '../services/message.service';
import { DataMapComponent } from '../data-map/data-map.component';

@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.scss'],
  providers: [DataMapComponent],
})
export class DataDetailsComponent {
  @Input() lst_choosen: any;
  @Output() openCatalogue = new EventEmitter<any>();
  @Output() idDataSelected = new EventEmitter<any>();
  @Output() closeDetails = new EventEmitter<any>();


  displayOnMap = true;
  displayDetailsBody: any = {};
  displayBoxControl: any = {};
  countDetailsname: any = {};
  detailsName: any;
  disablePreviousDate = false;
  disableAfterDate = false;

  closeTimeLine: any = {};
  minDate = new Date("2022/02/13");
  maxDate = new Date();
  events2 = "2021-04-13T00:00:00,2022-04-13T00:00:00,2023-04-13T00:00:00,2024-04-13T00:00:00";
  lstTime: any[] = [];

  lstStyles: any[] = [];

  constructor(
    public _dataMapService: DataMapService,
    public _dataMapComponent: DataMapComponent,
    public _dataDetailsService: DataDetailsService,
    public messageService: MessagesService,
  ) {}

  ngOnInit() {
    this.customDetailsBeforeInit();
    this.lstTime = this._dataDetailsService.convertGTMTime(this.events2);
  }

  customDetailsBeforeInit() {
    for(var x of this.lst_choosen) {
      console.info(x.selectedStyle);

      // Initial opacity
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

  async hideShowDataMap(i: any) {
    var btn = document.getElementById(`display-btn-${i.displayName}`);
    if (btn) {
      if (this.displayOnMap) {
        btn.style.backgroundColor = 'white';
        this.displayOnMap = false;
        await this._dataMapService.RemoveDataFromMap(i.displayName);
      } else {
        btn.style.backgroundColor = '#002470';
        this.displayOnMap = true;
        if(i.loaiData == 'landcover') {
          this._dataMapService.AddDataLandCover(i.tenData, i.workspace, i.selectedDate);
        }else {
          this._dataMapService.AddDataToMap(i.tenData, i.selectedStyle, i.selectedDate);
        }
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
  openCloseTimeBtn(i: any) {
    var btn = document.getElementById(`time-btn-${i.displayName}`);
    if(btn) {
      if(!this.closeTimeLine[i.displayName]) {
        btn.style.backgroundColor = "#002470";
        this.closeTimeLine[i.displayName] = true;
      }
      else {
        btn.style.background = "rgb(1, 168, 140)";
        this.closeTimeLine[i.displayName] = false;
      }
    }
  }
  isEventSelected(item: any) {
    const formattedDate = this._dataDetailsService.convertTimeStringFormat(item.selectedDate);
    for(let i = 0; i < this.lstTime.length; i++) {
      var bt = document.getElementsByClassName('custom-marker')[i];
      if(this.lstTime[i] == formattedDate) {
        if(bt) {
          if (
            bt instanceof HTMLInputElement ||
            bt instanceof HTMLElement
          ) {
            bt.style.background = "rgb(233 245 0)";
          }
        }
      }
      else {
        if(bt) {
          if (
            bt instanceof HTMLInputElement ||
            bt instanceof HTMLElement
          ) {
            bt.style.background = "#fff";
          }
        }
      }
    }
  }

  // Compare
  setActiveBtnCompare(index: any, displayName: any) {
    this._dataDetailsService.activeIndex[displayName] = index;
  }
  setcompareLeft(displayName: any) {
    this.setActiveBtnCompare(0, displayName);
    //this._dataMapService.removeCompareRightlayer();
    this._dataMapService.addCompareLeftlayer(displayName);
  }
  setcompareRight(displayName: any) {
    this.setActiveBtnCompare(2, displayName)
    //this._dataMapService.removeCompareLeftlayer();
    this._dataMapService.addCompareRightlayer(displayName);
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
          this._dataMapService.AddDataToMap(x.tenData, x.selectedStyle, x.selectedDate);
          this.displayBoxControl[nameData] = false;
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

  // Change styles
  async switchStyleData(x:any, event: any) {

    await this._dataMapService.RemoveDataFromMap(x.displayName) // xóa trước khi chuyển style
    x.selectedStyle = event.value;
    console.warn(x.selectedStyle);
    await this._dataMapService.AddDataToMap(x.tenData, x.selectedStyle, x.selectedDate);
  }

  // Change Date
  async switchDateData(x: any, event: any) {
    await this._dataMapService.RemoveDataFromMap(x.displayName)
    var dateString = this.convertTimeFromGTM (event);
    x.selectedDate = dateString;
    await this.isEventSelected(x);
    console.warn(x.selectedDate);
    await this._dataMapService.AddDataToMap(x.tenData, x.selectedStyle, x.selectedDate)
  }

  convertTimeFromGTM(event : any) {
    let gmtDate = new Date(event);

    // Convert GMT date to UTC and format it as 'YYYY-MM-DDTHH:mm:ss'
    let year = gmtDate.getUTCFullYear();
    let month = String(gmtDate.getMonth() + 1).padStart(2, '0');
    let day = String(gmtDate.getDate()).padStart(2, '0');
    let hours = String(gmtDate.getHours()).padStart(2, '0');
    let minutes = String(gmtDate.getMinutes()).padStart(2, '0');
    let seconds = String(gmtDate.getSeconds()).padStart(2, '0');

    // Construct the UTC date string
    let utcDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return utcDateString
  }
}
