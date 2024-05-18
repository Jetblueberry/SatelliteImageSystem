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
}
