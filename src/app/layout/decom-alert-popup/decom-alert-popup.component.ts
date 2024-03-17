import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-decom-alert-popup',
  templateUrl: './decom-alert-popup.component.html',
  styleUrls: ['./decom-alert-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecomAlertPopupComponent {

  private stockId = 'State Bank';
  private appRegCountryId = 123;
   private count = 123;
   private isPopup = true;


  //public get stockName(): string { return '';} ;//this._matDialogData.stockName; }

  //public get count(): number { return 1 ;}; //this._matDialogData.count; }

  constructor(private _injector: Injector, private dialogRef: MatDialogRef<DecomAlertPopupComponent>, @Inject(MAT_DIALOG_DATA) public _matDialogData: any,
    
    ) {
  }

  public onCloseDialogueClick(): void {
    console.log('Claose called');
    this.dialogRef.close(null);
  }

}