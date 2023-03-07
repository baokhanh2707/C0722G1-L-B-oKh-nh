import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BehaviorServiceService {
  private resultSearch: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() {
  }
  setSearch(value: string) {
    this.resultSearch.next(value);
  }

  getSearch(): Observable<any> {
    return this.resultSearch.asObservable();
  }
}
