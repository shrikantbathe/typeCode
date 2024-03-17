import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, Injector } from '@angular/core';

import { Subscription, of, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { IAutoCompleteSearchDetail } from './models/IAutoCompleteSearchDetail';
import { AutoCompleteService } from './auto-complete.service';
import { ToasterType } from '../core/ToasterTypes.type';
import { Router } from '@angular/router';




@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {



  @ViewChild('searchBox', { static: true }) searchBox: ElementRef<HTMLInputElement>;
  @Input() shouldShowSearchResults: boolean;
  @Input() enablescrollInsearchResult: boolean = false;
  @Input() disableSearchIconOnClick: boolean;
  @Input() disablesearchByEnter: boolean;
  @Input() redirectOnSearchedItenClick = false;
  @Input() focusSearchbox = false;
  @Input() searchValue: string;
  @Input() showsearch = true;
  @Input() showConsolidatedApps = false;
  @Input() placeholderValue = "Enter Stock..";
  @Input() searchWithinLob: boolean = false;
  @Input() flagType: string | null;
  @Input() showAllBorder = false;

  @Output() searchResultClick = new EventEmitter<IAutoCompleteSearchDetail>();
  @Output() searchTermChange = new EventEmitter<string>();


  public showClose = true;
  public loadSpinner = false;
  public noDataFound = false;
  public showSearchResults = true;
  public showMoreLink = false;
  public searchResults: IAutoCompleteSearchDetail[] = [];

  private subscription: Subscription;

  private userRoleSubscription: Subscription;

  private objArray = [];

  private _searchTerms$ = new Subject<string>();

  private searchResultsCache: IAutoCompleteSearchDetail[] = [];
  private readonly MAX_RESULTS = 5;

  constructor(private _autoCompleteService: AutoCompleteService,
    private _injector: Injector,
    private _router: Router,) {
    //  super(_injector)
  }

  public ngOnInit(): void { 
    //this.setSubscriptions(); 
  }

  public ngAfterViewInit(): void { if (this.focusSearchbox) setTimeout(() => { this.searchBox.nativeElement.focus(); }, 0); }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.userRoleSubscription) this.userRoleSubscription.unsubscribe();

    // super.cleanup();
  }

  public onSearchTermChange(searchTerm: string): void {
    this.noDataFound = false;
    const searchText = searchTerm.trim();
    this.searchTermChange.emit(searchText.trim());

    if (searchText.length > 0)
      this.showClose = true;

    if (searchText.trim().length <= 2) {
      this.loadSpinner = false;
      this.searchResultsCache = [];
      this.searchResults = [];
      this.showMoreLink = false;
      return;
    }

    if (!!searchText && searchText.length >= 3 && this.shouldShowSearchResults && this.searchResultsCache.length === 0) {
      this.loadSpinner = true;

      if (this.subscription)
        this.subscription.unsubscribe();

      this.subscription = this._autoCompleteService.search(searchText, this.searchWithinLob, this.flagType)
        .subscribe(
          (response: IAutoCompleteSearchDetail[]) => {

            this.showMoreLink = response.length > this.MAX_RESULTS;

            if (!this.enablescrollInsearchResult)
              this.searchResults = response.slice(0, this.MAX_RESULTS);

            if (this.enablescrollInsearchResult)
              this.searchResults = response;
            this.searchResultsCache = response;

            if (response.length === 0)
              this.noDataFound = true;

            this.loadSpinner = false;
            //   this._changeDetectorRef.markForCheck();
          },
          (error) => this.handleSubscriptionError(error));
      this.showSearchResults = true;
    }
    else {
      let sealid = +searchText;
      this.searchResults = [];
    
      if (false) {
        this.searchResultsCache.forEach(item => {
          if (item.name.toString().toUpperCase().indexOf(searchText.toUpperCase()) !== -1) {
            this.searchResults.push(item);
            this.noDataFound = false;
          }
        });
      }
      else {
        this.searchResultsCache.forEach(item => {

          if (item.name.toString().toUpperCase().indexOf(searchText.toUpperCase()) != -1) {
            this.searchResults.push(item);

            this.noDataFound = false;

          }
        });

        if (this.searchResults.length === 0)
          this.noDataFound = true;
      }

      if (!this.enablescrollInsearchResult) {
        this.showMoreLink = this.searchResults.length > this.MAX_RESULTS;
        this.searchResults = this.searchResults.slice(0, this.MAX_RESULTS);
      }
    }
  }


  public onClearSearchClick(): void {
    this.clearSearch();
  }

  public onSearchClick(searchTerm: string): void {
    if (!this.disableSearchIconOnClick)
      this.searchAndNavigate(searchTerm);

  }

  public onFormSubmit(searchTerm: string): void {
    if (!this.disablesearchByEnter)
      this.searchAndNavigate(searchTerm);
  }

  public onSearchedItemClick(item: IAutoCompleteSearchDetail): void {
    if (this.redirectOnSearchedItenClick) {
      if (false)
        this._router.navigate(['/application/${item.appRegCountryId}/assessment/regulatory']);
      else

        this._router.navigate(['/application/${item.appRegCountryId}/summary']);
    }
    else {
      this.objArray.push(item);

      if (typeof (Storage) !== undefined)
        localStorage.setItem("SearchResult", JSON.stringify(this.objArray))

      this.searchResultClick.emit(item);

      this.showSearchResults = true;
    }
  }

  public clearSearch(): void {

    let autoCompleteInput = document.getElementById('autosuggestInput') as HTMLInputElement;

    autoCompleteInput.value = '';

    this.onSearchTermChange('');
    this.showClose = false;

    autoCompleteInput.focus();
  }

  private searchAndNavigate(searchTerm: string): void {
    if (!searchTerm || searchTerm.length <= 2)
      //    super.triggerToaster( 'warning', MESSAGES_MASTER.AUTOCOMPLETE.Message);

      if (!!searchTerm && searchTerm.length >= 3)
        this._router.navigate(['/searchdetails', searchTerm]);

  }

  private setSubscriptions(): void {
    this._searchTerms$.pipe(
      //    takeUntil(this.unsubscribeNotifier$),

      
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term ? this._autoCompleteService.search(term) : of<IAutoCompleteSearchDetail[]>([])),
      catchError((error) => {
        console.error(error);
        return of<IAutoCompleteSearchDetail[]>([]);
      })
    ).subscribe((response: Array<any>) => {
      //  response = ObjectUtils.sortByProperties(response, 'name');

      
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@yyyyyyyyyyyyyyyyyyy');
      this.showMoreLink = response.length > this.MAX_RESULTS;
      this.searchResults = (response as Array<any>).slice(0, this.MAX_RESULTS);
    });
  }



  public handleSubscriptionError = (error = null): void => {
    this.triggerToaster('error', error && error.message);
  };

  // protected triggerToaster( ): void {

  //  this.triggerToaster(type, message, isToPersist, tapToDismiss, displayTimeInMilliSeconds);

  // }
  protected triggerToaster(type: ToasterType, message: string, isToPersist = false, tapToDismiss = true, displayTimeInMilliSeconds = 10000): void {
    //             debugger;
    // console.log('dddddddddddddddddddddddddddddddddd')
    //             this._toasterService[type]('fffff','asdsdsd',{
    //               timeOut: displayTimeInMilliSeconds,
    //               disableTimeOut: isToPersist,
    //               enableHtml: true,
    //               tapToDismiss,
    //             });

    //   if(type === 'error' && !!!message)
    //          this.coreService.triggerToaster(type, 'Erorr from server', isToPersist, tapToDismiss, displayTimeInMilliSeconds);


  }

}