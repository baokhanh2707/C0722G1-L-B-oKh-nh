import { Injectable } from '@angular/core';


// tslint:disable-next-line:typedef
function addYears(diff: Date, years: any) {
  return undefined;
}

// tslint:disable-next-line:typedef
function differenceInYears(now: Date, diff: Date) {
}

function differenceInMonths(now: Date, diff: string | number | Date) {
}

// tslint:disable-next-line:typedef
function addMonths(diff: string | number | Date, months: void) {
  return undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {
  getDiffToNow(diff: string | number | Date): string {
    const result: string[] = [];
    const now = new Date();
    diff = new Date(diff);
    const years = differenceInYears(now, diff);


    // @ts-ignore
    if (years > 0) {
      result.push(`${years} years`);
      // @ts-ignore
      diff = addYears(diff, years);
    }

    const months = differenceInMonths(now, diff);
    result.push(`${months} months`);
    if (months > 0) {
      diff = addMonths(diff, months);
    }

    const days = differenceInDays(now, diff);
    if (days > 0) {
      result.push(`${days} days`);
    }

    return result.join(' ');
  }
  constructor() { }
}
