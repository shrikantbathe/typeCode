import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListPageRoutingModule } from './list-page-routing.module';
import { ListPageComponent } from './list-page.component';
import { DataCenterComponent } from '../add-datacenter/data-center.component';
import { FormModule } from '../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, ListPageRoutingModule, FormModule, ReactiveFormsModule],
    declarations: [ListPageComponent, DataCenterComponent]
})
export class ListPageModule {}
