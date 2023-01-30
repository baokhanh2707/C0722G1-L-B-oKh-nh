import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataFormService {
URL_DATAFORM='http://localhost:8080/data-form';
  constructor(private httpClient: HttpClient) {}
  // dataFormPage() : Observable<any> {
  //   return this.httpClient.get<any>(this.URL_DATAFORM);
  // }
  searchByContent(content: string,page: number): Observable<any> {
    if (content == "") {
      return this.httpClient.get<any>('http://localhost:8080/data-form?page=' + page);
    } else {
      return this.httpClient.get<any>('http://localhost:8080/data-form?content=' + content + '&page=' + page);
    }
  }
}
