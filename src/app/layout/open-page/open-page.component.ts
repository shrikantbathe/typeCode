import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppPageService } from '../app-page/app-page.service';
import { AppData } from '../core/AppData';
import { SearchPageDataService } from '../search-page/search-page-data.service';
import { DecomAlertPopupComponent } from '../decom-alert-popup/decom-alert-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
    selector: 'open-page',
    templateUrl: './open-page.component.html',
    styleUrls: ['./open-page.component.scss']
})
export class OpenPageComponent implements OnInit {
    
  private appData$ = new BehaviorSubject<AppData>(null);
  _appData$ = this.appData$.asObservable();

  appData: AppData = null;
  constructor(private _appService: AppPageService,   private _materialDialog: MatDialog,
    private _dataService: SearchPageDataService) { }


  ngOnInit(): void { 
  
    this.processLoad();
    this.checkForDecomAlert();
  }



  private processLoad() {

    this._appService.getAppDetails().subscribe((data) => {
      this._appService.setAppData(data);
      this.appData = data;

    },
      (error) => {
        //trigger toaster
      }
    );

  }



  
  private checkForDecomAlert(): void {
    
    this._dataService.getDecomAlertDetails('sbi').subscribe(
      ({ alertFlag }) => {

        // if (alertFlag !== 'Yes') {
        //   return;
        // }
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+ alertFlag);
        this._materialDialog.open(DecomAlertPopupComponent, {
          width: '52%',
          height: '50%',
          autoFocus: false,
          disableClose: false, 
          scrollStrategy: new NoopScrollStrategy(),
          data: { stockId: 'sbin', count: 123 }, //pass properties retrived from http call
        });
      });
  }

}
