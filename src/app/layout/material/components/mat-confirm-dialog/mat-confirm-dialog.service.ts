import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { IMatCustomConfirmDialogConfig } from './models/IMatCustomConfirmDialogConfig';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
export class MatConfirmDialogService {

  private _config$   = new Subject<IMatCustomConfirmDialogConfig>();
  public config$  = this._config$.asObservable();
   
  public setConfig(value: IMatCustomConfirmDialogConfig): void { this._config$.next(value); }

}




 
  