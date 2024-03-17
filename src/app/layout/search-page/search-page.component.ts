import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppPageService } from '../app-page/app-page.service';
import { DateTimeService } from '../core/DateTimeService.service';
import { IMyFormData } from '../core/IMyFormData';
import { FormPageService } from '../form-page/form-page.service';
import { SearchPageDataService } from './search-page-data.service';
import { SearchPageService } from './search-page.service';
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
   
 @ViewChild(AutoCompleteComponent, {static: false}) autoComplete: AutoCompleteComponent;
  
    constructor(private _injector: Injector,  private _facade: SearchPageService) {    }

    public notifiedOnSearchResultClick(item:any) {
 
        this._facade.setSelectedStockId(item.name);
        this._facade.refreshFormData(item.name);
    }
 
    public notifiedOnSearchResultComplete() {

        if(!!this.autoComplete?.searchResults)  
        this.autoComplete.searchResults = [];
    }

}
