import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, map, catchError, throwError, Subject, filter, combineLatest, BehaviorSubject, switchMap, takeUntil } from 'rxjs';
import { AppData } from '../core/AppData';
import { IMyFormData } from '../core/IMyFormData';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeService } from '../core/DateTimeService.service';
import { FormPageDataService } from './form-page-data.service';
import { AppPageService } from '../app-page/app-page.service';
import { IMyDate } from 'angular-mydatepicker';
import { ServiceBase } from '../core/ServiceBase.service';
import { ToastrService } from 'ngx-toastr';

const INIT_STATE: IMyFormData = { name: '', comment: '', dateVal: '' }

@Injectable({providedIn: 'root'})
export class FormPageService extends ServiceBase {

  private _formDataService$ = new Subject<IMyFormData>();

  public appForm$: Observable<IMyFormData>;

  public stockForm: FormGroup;

  public formData: IMyFormData;

  public selDate: IMyDate;

  public _appFormDataBooleanTemp$ = new BehaviorSubject<boolean>(false);

  public formDataService$ = this._formDataService$.asObservable().pipe(filter((d: IMyFormData) => !!d));

  constructor(private _http: HttpClient, private dateTimeService: DateTimeService, private _injector: Injector, private _appService: AppPageService, 
      private formDataService: FormPageDataService, private fb: FormBuilder, private tastrService: ToastrService) {
    super(_injector);
    this.initForm();
    this.loadData();
  }

  public initForm(): void {
    this.stockForm = this.fb.group({
      comment: [''],
      myDate: [''],
      name: [''],
    });

  }

  public loadData(): void {
    //this.toastrService.error('Message Error!', 'Title Error!');
    this._formDataService$.next(INIT_STATE);
    const appDataOne$ = this._appService.appDataTakeOnce$;
    this.appForm$ = combineLatest([appDataOne$, this._appFormDataBooleanTemp$])
      .pipe(takeUntil(this.unsubscribeNotifier$),
        switchMap(([{ name }, isChanged]) => {
          return this.formDataService.getFormDetails();
        }));

    this.appForm$.subscribe((data) => {
      console.log('->' + data.dateVal);
      this.formData = {
        name: data.name,
        dateVal: data.dateVal,
        comment: data.comment
      };
      this.setFormData();
    });
  }

  public setFormData(): void {
    const { dateVal, comment, name } = this.formData;

    this.stockForm.setValue({ myDate: this.dateTimeService.formatDateWithOutTimezonPart(dateVal), comment: comment, name: name });

    this.selDate = this.dateTimeService.formatDateWithOutTimezonPart(dateVal);

    //this.stockForm.patchValue({myDate: {year:2021, month: 12, day: 12 }});
  }

  public getFormDetails(): Observable<IMyFormData> { 
    this._formDataService$.next(INIT_STATE);
    return this.formDataService.getFormDetails();
  }


  public saveFormDataTOServer(): void {

    const formConst = this.stockForm.value;
    formConst.dateVal = this.dateTimeService.formatMyDatePickerDate(formConst.myDate) //'2023-09-27T13:48:06.7521836'

    this.formDataService.saveDataTOServer(formConst).subscribe(
      () => {
        //super toster sucess
        //refresh call here
      },
      (error) => {
        //trigger toaster for error
      }
    );
  }

  public showSuccess(): void {
    this.tastrService.success('Message Success!', 'Title Success!');
  }

}
