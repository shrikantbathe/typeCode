import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { AppPageService } from '../app-page/app-page.service';
import { BehaviorSubject, Observable, combineLatest, of, switchMap } from 'rxjs';
import { FormPageService } from './form-page.service';
import { IMyFormData } from '../core/IMyFormData';
import { IMyDate } from 'angular-mydatepicker';
import { DateTimeService } from '../core/DateTimeService.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  ngOnInit() { }

  public stockForm: FormGroup;
  public _formBuilder: FormBuilder;
  public appForm$: Observable<IMyFormData>;
  public selDate: IMyDate;
  private formData: IMyFormData;

  public _appFormDataBooleanTemp$ = new BehaviorSubject<boolean>(false);

  public selectedDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: true,
    todayBtnTxt: 'Today',
    disableUntil: {
      year: 2017,
      month: 12,
      day: 1
    }
  };

  constructor(private fb: FormBuilder, private _appService: AppPageService, private _formService: FormPageService, private dateTimeService: DateTimeService) {
    this.selDate = { year: 2021, month: 12, day: 12 };//this.dateTimeService.formatDateWithOutTimezonPart(dateVal);
  }

  private onDateChanged(event) {
    // console.log("event", event.date);
    this.myDatePickerOptions.disableUntil.day = event.date.day;
    this.myDatePickerOptions.disableUntil.month = event.date.month;
    this.myDatePickerOptions.disableUntil.year = event.date.year;
  }

  public onClick(): void {
  }

  public onSubmitClick(): void {
    this._formService.saveFormDataTOServer();
  }

}
