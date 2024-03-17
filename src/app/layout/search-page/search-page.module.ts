import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { AutoCompleteModule } from '../auto-complete/auto-complete.module';
import { DeclarationInfoComponent } from './declaration/declaration-info.component'; 
import { DecomAlertFormModule } from '../decom-alert-form/decom-alert-form.module';

@NgModule({
    imports: [CommonModule, SearchPageRoutingModule, AutoCompleteModule, DecomAlertFormModule],
    declarations: [SearchPageComponent, DeclarationInfoComponent]
})
export class SearchPageModule {}
