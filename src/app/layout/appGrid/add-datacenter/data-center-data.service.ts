import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DateTimeService } from '../../core/DateTimeService.service';
import { IMyFormData } from '../../core/IMyFormData';
import { IDataCenter } from '../../core/IDataCenter';

@Injectable({
  providedIn: 'root'
})
export class DataCenterDataService {


  constructor(private _http: HttpClient, private dateTimeService: DateTimeService) { }

  public getDataCenterDetails(): Observable<IDataCenter[]> {
    return this.getAsObservable<IDataCenter[]>('http://localhost:8080/getDataCenters');
  }

  public saveDataCenter(data: IDataCenter): Observable<IDataCenter[]> { 
   // return this.getAsObservable<IDataCenter[]>('http://localhost:8080/saveDataCenters');
    let url = 'http://localhost:8080/saveDataCenters';
    return this._http.post<IDataCenter[]>('' + url, data);

  }



  // public saveDataTOServer(myFormData: Partial<IMyFormData>): Observable<IMyFormData> {
  //   let url = 'http://localhost:8080/saveFormData';
  //   return this._http.post<IMyFormData>('' + url, myFormData);

  // }
  



  public getAsObservable<T>(url: string): Observable<T> {
    return this._http.get<T>('' + url).pipe(map(response => response as T),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  

}
