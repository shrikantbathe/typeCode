import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataCenterFormFactory } from './data-center.form.factory';
import { DataCenterForm } from './data-center.form';
import { ViewContext } from './viewContext.type';
import { DataCenterService } from './data-center.service';
import * as _ from 'lodash';
import { IDataCenter } from '../../core/IDataCenter';
@Component({
  selector: 'app-data-center',
  templateUrl: './data-center.component.html',
  styleUrls: ['./data-center.component.scss'],
  providers: [
    DataCenterFormFactory,
    {
      provide: DataCenterForm,
      useFactory: (dataCenterFactory: DataCenterFormFactory) => dataCenterFactory.create(),
      deps: [DataCenterFormFactory]
    }
  ]
})
export class DataCenterComponent implements OnInit {

  @Input() show: boolean = true;
  @Input() application: string;
  @Input() viewContext: ViewContext;
  @Input() projectId: number;

  @Output() notifySaveSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() notifyCloseForm: EventEmitter<void> = new EventEmitter<void>();

  private deploymentNames: string = '';
  public dataCenterData = [];
  public dataCenterData1: any;

  constructor(private dataCenterForm: DataCenterForm, private dataCenterService: DataCenterService) {

  }

  public ngOnInit(): void {

    this.setSubscriptions();
  }

  private setSubscriptions(): void { this.fetchData(); }

  private fetchData(): void {

    this.dataCenterService.getDataCenterDetails().subscribe((dataCenter) => {
      if (!!dataCenter) {
        console.log('dataCenter' + dataCenter);
        // this.dataCenterData = dataCenter;
        this.dataCenterForm.setDataCenters(dataCenter);

        this.clearData();
        this.setDefaultValues();
      }

    });
  }


  private setDefaultValues(): void {

    this.dataCenterForm.asFormGroup.controls['type'].patchValue('JPMC');

    //this.dataCenterForm.setDefault();
  }


  private clearData(): void {
    this.dataCenterForm.reset();
  }

  private onCancel(): void { console.log('onCancel@@@'); this.clearData(); }



  public onSave(): void {
    // if (this.dataCenterForm.inValid()) {
    //   // super.triggerToaster( 'error', 'Error Message');
    //   return;
    // }
debugger;
    const payload = this.dataCenterForm.asFormGroup.value;
 
let data: IDataCenter = {
  deploymentId: payload.type,
  destinationType: payload.type,
  destinationRegion: payload.region,
  destinationCountry: payload.country,
  destinationEnvironment: payload.environment,
  destinationDataCenter: payload.value,
}
    //this._actionNotifierService.triggerAction( type: 'create-inprogress');
    this.dataCenterService.addDataCenter(data).subscribe(
      (response): void => {
        if (response) {
          //super.triggerToaster( type: ‘success’, MESSAGES_MASTER.APP_SUMMARY.DATACENTER.add.success);
         // this.clearData();
          this.fetchData();
          this.notifySaveSuccess.emit();
          //this. _actionNotifierService.triggerAction( type: 'none');
        }
      },
      (error) => {

      });
  }

}
