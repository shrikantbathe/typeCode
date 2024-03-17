import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatProgressBarWrapperComponent } from './components/mat-progress-bar-wrapper/mat-progress-bar-wrapper.component'; 

@NgModule({
  imports: [

    MatAutocompleteModule, MatButtonModule, MatChipsModule,
    MatDatepickerModule, MatDialogModule, MatDividerModule,
    
    MatFormFieldModule, MatIconModule, MatInputModule,  
    MatProgressBarModule, MatSelectModule, MatSlideToggleModule, MatTabsModule,
    MatTooltipModule, MatMenuModule, MatRadioModule,],
    
    exports: [
    MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDatepickerModule,
    MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
     MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule,
    MatSlideToggleModule, MatTabsModule, MatTooltipModule, MatMenuModule, MatRadioModule,
    //Components. ..
     
    
    MatProgressBarWrapperComponent,
    ],
    declarations: [MatProgressBarWrapperComponent]
})
  export class MaterialModule { }
