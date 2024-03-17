import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OpenPageRoutingModule } from './open-page-routing.module';
import { OpenPageComponent } from './open-page.component';
import { MaterialModule } from '../material/material.module';
import { DecomAlertPopupModule } from '../decom-alert-popup/decom-alert-popup.module';

@NgModule({
    imports: [CommonModule, OpenPageRoutingModule, MaterialModule, DecomAlertPopupModule],
    declarations: [OpenPageComponent]
})
export class OpenPageModule {}
