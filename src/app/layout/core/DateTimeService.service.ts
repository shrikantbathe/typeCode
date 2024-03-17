import { Injectable, Injector } from "@angular/core";
import { IMyDate } from "mydatepicker";
import { Subject } from "rxjs";
import { DataType } from "./dataTypes.enum";




@Injectable({providedIn: 'root'})
export abstract class DateTimeService { 

    constructor(private ___injector: Injector,) {  }
 
    public getDateFromDatePickerObject(datePickerObj: IMyDate): Date {
      if(!!!datePickerObj) return null;
      const date = new Date(datePickerObj.year, datePickerObj.month-1, datePickerObj.day);
      return date;
    }

    public formatMyDatePickerDate(dateObj: IMyDate) : string | null {
      const date = this.getDateFromDatePickerObject(dateObj);
      return !!date? this.getFormattedDate(date): null;

    }

    private getFormattedDate(selDate: Date) : string {

      return '2023-01-17T13:48:06.7521836';


    }


    public getMyDatePickerDateObjectFromString(dateObj: string, defaultWhenEmpty: true) : IMyDate {


      if (!!!dateObj)
      return defaultWhenEmpty ? dateObj : dateObj as any;

      if(dateObj.indexOf('T') ===-1)

      dateObj += 'T00:00:00:00:0Z';

      const dateVal = this.formatDateWithOutTimezonPartString(dateObj, true);
      const dt = new Date(dateVal);
      return this.getDatePickerDate(dt);
      

    }

    public formatDateWithOutTimezonPartString(date: string, relpaceDateseparator = false): string {
      if (date && (typeof date !== DataType.STRING)) throw new Error("error , No strin gformat");

      let startIndexOf = date.indexOf('T');
      if (startIndexOf !== -1) {
        date = date.substring(0, startIndexOf);
          if (relpaceDateseparator) {
            date = date.replace(/-/g, '\/');
          }
      }
      return date;

    }




    public formatDateWithOutTimezonPart(date: string, relpaceDateseparator = false): IMyDate {

        let utcStartIndex = date.indexOf('T');
    
        if (utcStartIndex !== -1) {
    
          date = date.substring(0, utcStartIndex);
          if (relpaceDateseparator) {
            date = date.replace(/-/g, '\/');
          }
        }
    
        const dt = new Date(date);
        console.log(':::::' + dt);
        return this.getDatePickerDate(dt);
    
      }

      private getDatePickerDate(dt?: Date): IMyDate {

        if (!!!dt) dt = new Date();
         
        return { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDay() };
    
      }

      

}