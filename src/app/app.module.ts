import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'; 
import { FormModule } from './layout/form/form.module'; 
import { MyDatePickerModule } from 'mydatepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr'; 

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormModule, ReactiveFormsModule ,
        BrowserAnimationsModule,MyDatePickerModule,
        HttpClientModule,
        LanguageTranslationModule,
        ToastNoAnimationModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 15000, // 15 seconds
            closeButton: true,
            progressBar: true,
          }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
