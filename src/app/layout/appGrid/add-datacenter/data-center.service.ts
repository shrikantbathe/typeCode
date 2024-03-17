import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { DateTimeService } from '../../core/DateTimeService.service';
import { IMyFormData } from '../../core/IMyFormData';
import { IDataCenter } from '../../core/IDataCenter';
import { DataCenterDataService } from './data-center-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataCenterService {

  constructor(private _http: HttpClient, private dataCenterDataService: DataCenterDataService) { }

  public getDataCenterDetails(): Observable<IDataCenter[]> {
    return this.dataCenterDataService.getDataCenterDetails();
  }


  public addDataCenter(dataCenter: IDataCenter): Observable<any[]> {
      return this.dataCenterDataService.saveDataCenter(dataCenter) ;
  }





}
