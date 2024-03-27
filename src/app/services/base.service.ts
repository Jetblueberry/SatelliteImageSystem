import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

// import { Filter, StringCompareOption } from '../models/gridinfo';

@Injectable({
  providedIn: 'root',
})

export class BaseService {
  protected serviceUri: any;
  constructor(
    public http: HttpClient,
    public _commonService: CommonService
    ) {}

    getData(gridInfo: any) {
      return this.http
        .post<any>(
          `${this.serviceUri}/GetData`, gridInfo
        )
        .toPromise()
    }

    getAllByFilter(gridInfo: any) {
      return this.http
        .post<any>(
          `${this.serviceUri}/GetAllByFilter`, gridInfo
        )
        .toPromise()
    }
    getById(id: any) {
      return this.http
      .get<any>(
        `${this.serviceUri}/${id}`
      )
      .toPromise()
    }
    add(newOb: any) {
      return this.http
      .post<any>(
        `${this.serviceUri}`, newOb
      )
      .toPromise()
    }
    put(id: any, newOb: any) {
      return this.http
      .put<any>(
        `${this.serviceUri}/${id}`, newOb
      )
      .toPromise()
    }

    delete(id: any) {
      return this.http
        .delete<any>(
          `${this.serviceUri}/${id}`
        )
        .toPromise()
    }
}
