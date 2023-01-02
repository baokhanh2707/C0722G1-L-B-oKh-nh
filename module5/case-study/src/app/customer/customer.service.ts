import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerType} from "./customerType";
import {Observable} from "rxjs";
import {Customer} from "./customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_CUSTOMER = 'http://localhost:3000/customer'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL_CUSTOMER)
  }
}
