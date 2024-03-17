import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, map, catchError, throwError, Subject, filter, combineLatest, BehaviorSubject, switchMap, takeUntil, forkJoin } from 'rxjs';
import { AppData } from '../core/AppData';
import { IMyFormData } from '../core/IMyFormData';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeService } from '../core/DateTimeService.service'; 
import { AppPageService } from '../app-page/app-page.service';
import { IMyDate } from 'angular-mydatepicker';
import { ServiceBase } from '../core/ServiceBase.service'; 
import { IDecomAlertPayload } from '../core/IDecomAlertPayload';
import { IDecomAlertPayloadState } from '../core/IDecomAlertPayloadState';
import { SearchPageDataService } from './search-page-data.service';

const INIT_STATE: IDecomAlertPayloadState = {data: null, uiStatus: 'loading', count: null, lastModifiedBy: ''} as IDecomAlertPayloadState 

@Injectable({providedIn: 'root'})
export class SearchPageService extends ServiceBase {



  private _selfDeclaration$ = new BehaviorSubject<IDecomAlertPayloadState>(null);

  public selfDeclaration$ = this._selfDeclaration$.asObservable();//.pipe(filter((d)=> !!d))
 
  private get selectedStockId(): string { return this._selfDeclaration$.value.selectedStockId; }

  constructor(private _injector: Injector,  private _dataService: SearchPageDataService) {  super(_injector);  }


  public setSelectedStockId(name: string) : void {
    this._selfDeclaration$.next({
      ...INIT_STATE,
      selectedStockId: name,
    });
  }
  
  public refreshFormData(stockId: string): void {

    this._selfDeclaration$.next({
      ...INIT_STATE,
      selectedStockId: this.selectedStockId,
    });

    
  const flagCountData$ = this._dataService.getDecomAlertDetails(this.selectedStockId);
  const detailsData$ = this._dataService.getSelfDeclarationDetails(this.selectedStockId);

  forkJoin([flagCountData$, detailsData$]).subscribe(
    ([flagCountData,responseData])=> {

      // console.log(responseData);
      // console.log(flagCountData);

      const selfDeclaration: IDecomAlertPayloadState = {
          selectedStockId: this.selectedStockId,
          lastModifiedBy: 'shri',
          data: responseData,
          uiStatus: 'completed',
          count: flagCountData.cloudCount,
          showDeclarationInfo: true,
      }

      this._selfDeclaration$.next(selfDeclaration);
    },
    (error)=>{
      console.log('llllllllllllllllllkkkkkkkkkkkkkkkkkkkk');
    }
  );

  }
 
}
