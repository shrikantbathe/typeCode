import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IAutoCompleteSearchDetail } from './models/IAutoCompleteSearchDetail'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataType } from '../core/dataTypes.enum'; 

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

 // protected get _httpHelper(): HttpHelperService { return this._injector.get(HttpHelperService);}
  constructor(protected _injector: Injector, private _http: HttpClient) { }


  public search(searchTerm: string, searchWithinLob?: boolean, flagType?: string | null):Observable<IAutoCompleteSearchDetail[]> {
     
        let URL = this.formatUrl('http://localhost:8080/search?term=:searchTerm', ':searchTerm', searchTerm);

    //    if (searchWithinLob && flagType === 'AMBER') { URL = URL + "&flagType=amber"; }
      //  URL = this.formatUrl(URL, ': fields', RESOURCE_MASTER.URLS .GENERAL .FILTERS.applicationSearch);

      //  URL = this.formatUrl(URL, ':searchTerm', searchTerm);

        return this.getAsObservable<IAutoCompleteSearchDetail[]>(URL);

  }


  public formatUrl(url: string, fieldLabel: any, fieldValue: any): string {
    let value = (typeof fieldValue === DataType.STRING) ? encodeURIComponent(fieldValue) : fieldValue;
    return url ? url.replace(fieldLabel.toString(), value) : url;
    
  }
    
    public getAsObservable<T>(url: string): Observable<T> {
    return this._http.get<T>(''+ url).pipe(map(response => response as T),
    catchError(this.handleError));

    }

private handleError(err: HttpErrorResponse) {
  return throwError(err);
}




}
