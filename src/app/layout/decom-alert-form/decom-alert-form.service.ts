import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { IDecomAlertPayload } from '../core/IDecomAlertPayload';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export const REASON_SELECT_CONST = [
  'Remind me in a Week',
  'Remind me in 2 Week',
  'Decom activity already completed',
  'Planning to complete on or berore',
  'Cannot initiate decom at this time because...',
  'Any other reason(s) please specify',
] as const;

export type REASON_SELECT = typeof REASON_SELECT_CONST[number];

@Injectable({ providedIn: 'root' })
export class DecomAlertFormService {

  public readonly reasonSelect$ = of(REASON_SELECT_CONST);

  constructor(private _http: HttpClient, private toasterService: ToastrService) { }

  public supressDecomAlert(payload: IDecomAlertPayload): Observable<any> {
 
    return this.post<any>('http://localhost:8080/saveStockAlertDetails', payload);
  }

  protected post<T>(url: string, bodyData: any): Observable<T> {
    return this._http.post<T>(url, bodyData).pipe(map((res) => { return res; }), catchError((err)=>this.handleError(err)));
  }

  private handleError(err:HttpErrorResponse): Observable<any> {
    //console.log('vvccxxzz'+err?.error);
   // this.openToaster('error',err?.message); 
  //  this.openToaster('error',err.error);

    return throwError(err);
  }




  public openToaster(error: string, message: string): void {
    const  constoptions= { positionClass:'toast-top-center' , timeOut: 5000 };
    if (error === 'error') {
      this.toasterService.error(message, 'Error!', constoptions);
    } else if (error === 'success') {
      this.toasterService.success(message, 'Success!', constoptions);
    } else if (error === 'warning') {
      this.toasterService.warning(message, 'Message Warning!', constoptions);
    } else if (error === 'info') {
      this.toasterService.info(message, 'Info!', constoptions);
    }  
    
   }


}
