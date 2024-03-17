import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { AppData } from '../core/AppData';
import { IMyFormData } from '../core/IMyFormData';
import { FormGroup } from '@angular/forms';
import { DateTimeService } from '../core/DateTimeService.service';

@Injectable({providedIn: 'root'})
export class FormPageDataService {

  constructor(private _http: HttpClient, private dateTimeService: DateTimeService) { }

  public getFormDetails(): Observable<IMyFormData> {
    return this.getAsObservable<IMyFormData>('http://localhost:8080/getFormData');
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
