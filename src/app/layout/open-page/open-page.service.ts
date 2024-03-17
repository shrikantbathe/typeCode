import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map, take, tap, throwError } from 'rxjs';
import { AppData } from '../core/AppData';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OpenPageService {
 
  private _appData$ = new BehaviorSubject<AppData>(null);

  public appData$ = this._appData$.asObservable().pipe(filter(app=> !!app));
  public appDataTakeOnce$ = this.appData$.pipe(take(1));
   
  constructor(private _http: HttpClient) { }

public getAppDetails(): Observable<AppData> {
      return this.getAsObservable<AppData>('http://localhost:8080/getAppData');
}

public getAsObservable<T>(url: string): Observable<T> {
  return this._http.get<T>(''+url).pipe(map(response => response as T),
  catchError(this.handleError));

  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
  
public setAppData(appData: AppData): void { this._appData$.next(appData);}

}
