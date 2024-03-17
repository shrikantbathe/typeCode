import { Injectable, Injector } from "@angular/core";
import { IMyDate } from "mydatepicker";
import { Subject } from "rxjs";

@Injectable()
export abstract class ServiceBase {

    private _unsubscribeNotifier$ = new Subject<void>();
    public unsubscribeNotifier$ = this._unsubscribeNotifier$.asObservable();
    constructor(private ___injector: Injector,) {  }


    public ngOnDestroy(): void {
        this.cleanup();
    }

    public cleanup(): void {
        
        this._unsubscribeNotifier$ && this._unsubscribeNotifier$.next();
        this._unsubscribeNotifier$ && this._unsubscribeNotifier$.complete();

    }

   
    public punchValuesToPlaceHolder(url:string, data: {}, encodeText = true): string {

        Object.keys(data).forEach((prop)=> {
            url = url.replace(`:${prop}`, encodeText ? encodeURIComponent(data[prop]) : data[prop]);
        });
        return url;
    }

      
}