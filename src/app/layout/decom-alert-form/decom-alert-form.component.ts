import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDecomAlertPayload } from '../core/IDecomAlertPayload'; 
import { DecomAlertFormService, REASON_SELECT } from './decom-alert-form.service'; 
import { Observable } from 'rxjs'; 
import { DateTimeService } from '../core/DateTimeService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IMyDate } from '../core/IMyDate';
import { IMyDpOptions } from 'mydatepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-decom-alert-form',
  templateUrl: './decom-alert-form.component.html',
  styleUrls: ['./decom-alert-form.component.scss'],
})
export class DecomAlertFormComponent {

  @Input() stockId: string;
  @Input() readonly appRegCountryId: number;
  @Input() readonly count: number;
  @Input() readonly isPopup: boolean;
  //@Input() lastModifiedBy: string;

  @Input() set declarationInfo(v: IDecomAlertPayload) {
    if (!!v) {
      this.setFormData(v);
      this.clearAutoCompleteResults();
      this.stockId = v.name;
   //   this.lastModifiedBy = '';
    }
    this._declarationInfo = v;
  }

  @Output() public notifyClearSearchResults = new EventEmitter<void>();
  @Output() public refreshFormData = new EventEmitter<void>();
  @Output() closeDialogue = new EventEmitter<void>();


  public decomAlertForm: FormGroup;
  public sector: FormControl;
  public comment: FormControl;
  public activityDate: FormControl;
  public commentTextLabel: string = "Enter Comments";
  public disableSubmit: boolean = true;

  public selDate: IMyDate;
  public showDate: boolean = false;
  public showComment: boolean = false;
  private _declarationInfo: IDecomAlertPayload;

  public get declarationInfo(): IDecomAlertPayload {
    return this._declarationInfo;
  }

  constructor(private _service: DecomAlertFormService, private _serviceDate: DateTimeService, private toasterService: ToastrService) {
    this.intiForm();
  }

  private setFormProperties(commentText: string, showDate: boolean, showComment: boolean, disableSubmit: boolean): void {
    this.commentTextLabel = commentText;
    this.showDate = showDate;
    this.showComment = showComment;
    this.disableSubmit = disableSubmit;
  }

  private setFormData({ comment, sector, activityDate }: IDecomAlertPayload): void {

    this.decomAlertForm.patchValue({ sector, comment, activityDate: this._serviceDate.formatDateWithOutTimezonPart(activityDate) });
    // const date: IMyDate = this._serviceDate.getMyDatePickerDateObjectFromString(activityDate, true);
    // this.selDate = date;
    this.onReasonChange();
  }

  public onReasonChange(): void {
    const reasonValue = this.sector.value as REASON_SELECT;
    if (!!!reasonValue) {
      this.setFormProperties('', false, false, true);
      return;
    }
    if (reasonValue === 'Remind me in a Week' || this.sector.value === 'Remind me in 2 Week') {
      this.activityDate.patchValue('');
      this.comment.patchValue('');
      this.setFormProperties('', false, false, false);
    }
    else if (reasonValue === 'Decom activity already completed') {
      this.activityDate.patchValue('');
      this.setFormProperties("Enter reference / supporting comments", false, true, !this.comment.valid);
    }
    else if (reasonValue === 'Planning to complete on or berore') {
      this.comment.patchValue('');
      this.setFormProperties("", true, false, !this.activityDate.valid);
      
      this.selDate = { year: 2021, month: 12, day: 12 };
     // this.selDate = this._serviceDate.formatDateWithOutTimezonPart(activityDate)
    }
    else if (reasonValue === 'Cannot initiate decom at this time because...') {
      this.activityDate.patchValue('');
      this.setFormProperties("Please provide your reason", false, true, this.comment.valid);
    }
    else if (reasonValue === 'Any other reason(s) please specify') {
      this.activityDate.patchValue('');
      this.setFormProperties("Enter Comments", false, true, !this.comment.valid);
    }
  }

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

  private intiForm(): void {

    this.sector = new FormControl('', Validators.required);
    this.comment = new FormControl('', Validators.required);
    this.activityDate = new FormControl('', Validators.required);

    this.decomAlertForm = new FormGroup({
      sector: this.sector,
      comment: this.comment,
      activityDate: this.activityDate
    });
    this.activityDate.patchValue({ year: 2021, month: 12, day: 12 });

  }

  private clearAutoCompleteResults(): void {
    this.notifyClearSearchResults.emit();
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
    


  public onSubmitClick(): void {
    if (!!this.decomAlertForm?.value?.activityDate && !!this.decomAlertForm?.value?.activityDate.date) {
      const { date: { year, month, day } } = this.decomAlertForm.value.activityDate;
      this.decomAlertForm.value.activityDate = new Date(year, month - 1, day + 1, 0, 0, 0).toISOString();
    }

    const payload = {
      ...this.decomAlertForm.value,
      appRegCountryId: this.appRegCountryId,
    };

    this._service.supressDecomAlert(payload).subscribe(
      () => {
        //super.triggerToaster( type: 'success', GENERAL_MESSAGE_MASTER.decom_alert_suppressed_succes);
        this.openToaster('success','Saved Successfully');
        if (this.isPopup) {
          this.closeDialogue.emit();
        }

        this.refreshFormData.emit();
      },
      (error) => {
        //this.componemtUpdateAction = 'none';
        //trigger toaster
        this.openToaster('error',error.error);
      });
  }

  public supressDecomAlert(payload: IDecomAlertPayload): Observable<any> {
    return this._service.supressDecomAlert(payload);
  }


}
