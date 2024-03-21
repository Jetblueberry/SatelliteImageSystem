import { Injectable, Injector} from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class DataDetailsService {
  showDetails = false;
  lstDataChoosen: any = [];
}
