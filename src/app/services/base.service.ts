import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

// import { Filter, StringCompareOption } from '../models/gridinfo';

@Injectable({
  providedIn: 'root',
})

export class BaseService {
  constructor(
    public http: HttpClient,
    public _commonService: CommonService
    ) {}

    getData(gridInfo: any, serviceUri: any) {
      return this.http
        .post<any>(
          `${serviceUri}/GetData`, gridInfo
        )
        .toPromise()
    }

    getAllByFilter(gridInfo: any, serviceUri: any) {
      return this.http
        .post<any>(
          `${serviceUri}/GetAllByFilter`, gridInfo
        )
        .toPromise()
    }
    getById(id: any, serviceUri: any) {
      return this.http
      .get<any>(
        `${serviceUri}/${id}`
      )
      .toPromise()
    }
    add(newOb: any, serviceUri: any) {
      return this.http
      .post<any>(
        `${serviceUri}`, newOb
      )
      .toPromise()
    }
    put(id: any, newOb: any, serviceUri: any) {
      return this.http
      .put<any>(
        `${serviceUri}/${id}`, newOb
      )
      .toPromise()
    }

    delete(id: any, serviceUri: any) {
      return this.http
        .delete<any>(
          `${serviceUri}/${id}`
        )
        .toPromise()
    }
}
