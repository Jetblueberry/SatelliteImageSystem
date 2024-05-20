import { Injectable, Injector} from '@angular/core';
import { DataCatalogueService } from '../data-catalogue-services/data-catalogue.service';

@Injectable({
  providedIn: 'root',
})

export class DataDetailsService {
  opacityValue: any = {};
  displayRowCompare = false;
  activeIndex: any = {};

  constructor(
    public _dataCatalogueService: DataCatalogueService
  ) {}

  CustomListChosen(lst_styles: string) {
    var styleArr: any[] = lst_styles.split(',')
    return styleArr;
  }

  convertGTMTime(lstTime: any) {
    var lstTimeCus = [];
    var ArrTime: any[] = lstTime.split(',');
    for(var x of ArrTime) {
      var a = new Date(x);
      lstTimeCus.push(a.toLocaleDateString());
    }
    return lstTimeCus;
  }

  convertTimeStringFormat(time: string) {
    var a = new Date(time);
    return a.toLocaleDateString();

  }
}
