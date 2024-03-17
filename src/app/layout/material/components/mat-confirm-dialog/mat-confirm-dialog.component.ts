import { Component, Inject, Injector } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IMatCustomConfirmDialogConfig } from './models/IMatCustomConfirmDialogConfig';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { type } from 'os';
import { MatConfirmDialogService } from './mat-confirm-dialog.service';
import { ConfirmDialogModel } from './models/ConfirmDialogModel';
import { MatModelConfirmResult } from './models/MatModelConfirmResult.type';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
export class MatConfirmDialogComponent {

  public title: string;
  public message: string;
  public config: IMatCustomConfirmDialogConfig;
  public comments: string = "";

  constructor(private _injector: Injector,
    public _dialogRef: MatDialogRef<MatConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: ConfirmDialogModel,
    private _matConfirmDialogService: MatConfirmDialogService,) {
    //super(_injector);
    this.init(_data);
  }

  public onActionClick(actionValue: MatModelConfirmResult): void {

    if (actionValue !== 'Cancel' && this.config.confirmWithComment && !!!(this.comments.trim())) {
      //super.triggerToaster( type: 'error', message: ‘Comments are mandatory');
      return;
    } else {
      const response = { actionValue, comments: this.comments };
      this._dialogRef.close(response);
    }

  }

  private init({ title, message }: ConfirmDialogModel): void {
    this.title = title;
    this.message = message;
    this.setSubscriptions();
  }

  private setSubscriptions(): void {
    this._matConfirmDialogService.config$
      //.pipe(takeUntil(this.unsubscribeNotifier$))
      .subscribe((config) => { this.config = config; });
  }

}
