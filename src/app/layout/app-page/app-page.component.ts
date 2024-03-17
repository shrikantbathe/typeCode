
import { Component, OnInit } from '@angular/core';
import { AppPageService } from './app-page.service';
import { AppData } from '../core/AppData';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, count } from 'rxjs'; 
import { SearchPageDataService } from '../search-page/search-page-data.service';  
import { DecomAlertFormComponent } from '../decom-alert-form/decom-alert-form.component';
import { DecomAlertPopupComponent } from '../decom-alert-popup/decom-alert-popup.component';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent implements OnInit {


  private appData$ = new BehaviorSubject<AppData>(null);
  _appData$ = this.appData$.asObservable();

  appData: AppData = null;
  constructor(private _appService: AppPageService,  private _materialDialog: MatDialog,
    private _dataService: SearchPageDataService) { }


  ngOnInit(): void { 
  
    this.processLoad();
   // this.checkForDecomAlert();
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


  //const flagCountData$ = this._dataService.getDecomAlertDetails(this.selectedStockId);

  private checkForDecomAlert(): void {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    this._dataService.getDecomAlertDetails('sbi').subscribe(
      ({ alertFlag }) => {

        // if (alertFlag !== 'Yes') {
        //   return;
        // }

        this._materialDialog.open(DecomAlertPopupComponent, {
          width: '500px',
          height: '400px',
          autoFocus: false,
          disableClose: true,  
          data: { stockName: 'sbin', count: 123 },
        });
      });
  }




}
