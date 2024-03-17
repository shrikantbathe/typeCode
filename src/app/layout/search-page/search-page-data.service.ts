import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { AppData } from '../core/AppData';
import { IMyFormData } from '../core/IMyFormData';
import { FormGroup } from '@angular/forms';
import { DateTimeService } from '../core/DateTimeService.service';
import { IDecomAlertPayload } from '../core/IDecomAlertPayload';
import { IDecomAlertFlag } from '../core/IDecomAlertFlag';
import { ServiceBase } from '../core/ServiceBase.service';
import { RESOURCE_MASTER } from '../core/AppData copy';

@Injectable({providedIn: 'root'})
export class SearchPageDataService extends ServiceBase  {


  constructor(private _http: HttpClient, private dateTimeService: DateTimeService, private _injector: Injector){
    super(_injector);
  }


  // public getSelfDeclarationDetails(appRegId: number): Observable<IDecomAlertPayload> {
  //   let url  = RESOURCE_MASTER.URLS.APP_URLS.baseUrl+RESOURCE_MASTER.URLS.APP_URLS.getStockDetails
  //   //url = super.punchValuesToPlaceHolder(url, {appRegId});

  //   return this.getAsObservable<IDecomAlertPayload>(url);
  // }

  public getSelfDeclarationDetails(appRegId: string): Observable<IDecomAlertPayload> {
    let name = ''+appRegId;
    let url  = RESOURCE_MASTER.URLS.APP_URLS.baseUrl+RESOURCE_MASTER.URLS.APP_URLS.getStockDetails
    url = super.punchValuesToPlaceHolder(url, { name });
    // console.log('url'+ url);

    return this.getAsObservable<IDecomAlertPayload>(url);
  }

  public getDecomAlertDetails(appRegId: string): Observable<IDecomAlertFlag> {
    return this.getAsObservable<IDecomAlertFlag>('http://localhost:8080/getStockAlertDetails');
  }


  public getAsObservable<T>(url: string): Observable<T> {
    return this._http.get<T>('' + url).pipe(map(response => response as T),
      catchError(this.handleError));

  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  public saveDataTOServer1(formData: FormGroup): Observable<IMyFormData> {

    const formConst = formData.value;

    formConst.dateVal = this.dateTimeService.formatMyDatePickerDate(formConst.myDate) //'2023-09-27T13:48:06.7521836'
 
    let url = 'http://localhost:8080/saveFormData';
    return this._http.post<IMyFormData>('' + url, formConst);

  }
  
  public saveDataTOServer(myFormData: Partial<IMyFormData>): Observable<IMyFormData> {
    let url = 'http://localhost:8080/saveFormData';
    return this._http.post<IMyFormData>('' + url, myFormData);

  }

}
