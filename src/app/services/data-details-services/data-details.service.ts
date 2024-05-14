import { Injectable, Injector} from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class DataDetailsService {
  opacityValue: any = {};
  displayRowCompare = false;
  CustomListChosen(lst_styles: string) {
    var styleArr: any[] = lst_styles.split(',')
    return styleArr;
  }

  openCompareList() {

  }
}
