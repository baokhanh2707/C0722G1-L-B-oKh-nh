import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../entity/product/product";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  getHomeList(page: number, search: string): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/public/list?page=' + page + '&search=' + search);
  }
  detailLapTop(id:number):Observable<any>{
    return this.httpClient.get('http://localhost:8080/api/public/detail?id=' + id)
  }

  getListTypeProduct(id:number):Observable<any>{
    return this.httpClient.get('http://localhost:8080/api/public/related?id='+id)
  }
}
