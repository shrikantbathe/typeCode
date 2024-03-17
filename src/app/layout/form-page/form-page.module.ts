import { CommonModule } from '@angular/common';

import { FormPageRoutingModule } from './form-page-routing.module';
import { FormPageComponent } from './form-page.component'; 
import { MyDatePickerModule } from 'mydatepicker';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule, 
        ToastrModule.forRoot({
            timeOut: 15000, // 15 seconds
            closeButton: true,
            progressBar: true,
            positionClass :'toast-bottom-right'
          }),
         FormPageRoutingModule],
    declarations: [FormPageComponent],
    providers: [ToastrService]
})
export class FormPageModule {}
