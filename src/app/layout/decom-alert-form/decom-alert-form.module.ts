import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecomAlertFormComponent } from './decom-alert-form.component';
import { FormModule } from '../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    DecomAlertFormComponent
  ],
  imports: [
    CommonModule, FormModule, ReactiveFormsModule, MyDatePickerModule,   ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000, // 15 seconds
      positionClass: 'toast-top-bottom', 
      preventDuplicates: true,
      progressBar: true,

    }),
  ],
  exports: [
    DecomAlertFormComponent
  ]
})
export class DecomAlertFormModule { }
