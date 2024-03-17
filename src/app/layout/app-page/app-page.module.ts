import { CommonModule } from '@angular/common';

import { AppPageRoutingModule } from './app-page-routing.module';
import { AppPageComponent } from './app-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MyDatePickerModule } from 'mydatepicker';
import { NgModule } from '@angular/core';
import { DecomAlertPopupModule } from '../decom-alert-popup/decom-alert-popup.module';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule, 
         AppPageRoutingModule],
    declarations: [AppPageComponent]
})
export class AppPageModule {}
