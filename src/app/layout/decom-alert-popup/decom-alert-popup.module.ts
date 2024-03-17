import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
 
import { DecomAlertPopupComponent } from './decom-alert-popup.component';
import { DecomAlertFormComponent } from '../decom-alert-form/decom-alert-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DecomAlertFormModule } from '../decom-alert-form/decom-alert-form.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DecomAlertPopupComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, DecomAlertFormModule, MaterialModule,
    CommonModule
  ],
  exports: [
    DecomAlertPopupComponent, DecomAlertFormComponent
  ]
})
export class DecomAlertPopupModule { }
