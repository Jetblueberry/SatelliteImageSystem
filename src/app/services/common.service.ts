import { Injectable } from '@angular/core';
import { Operator } from '../models/enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  newFilter(
    field: string,
    operator: Operator,
    value: any,
    valueIsField: boolean = false
  ) {
    return {
      field,
      operator,
      value: JSON.stringify(value),
      valueIsField,
    };
  }

  newFilterContainer(logic: 'and' | 'or', ...filters: any[]) {
    return {
      logic,
      filters: [...filters],
    };
  }
}
