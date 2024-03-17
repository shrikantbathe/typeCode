import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AutoCompleteComponent } from './auto-complete.component'; 
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AutoCompleteComponent
  ],
  imports: [
    CommonModule, FormsModule 
  ],
  exports: [
    AutoCompleteComponent
  ],
})
export class AutoCompleteModule { }
