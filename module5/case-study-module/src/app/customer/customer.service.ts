import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Customer} from './customer';
import {CustomerType} from './customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_CUSTOMER = 'http://localhost:3000/customer';
  URL_CUSTOMERTYPE = 'http://localhost:3000/customer-type';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.URL_CUSTOMER);
  }

  getType(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(this.URL_CUSTOMERTYPE);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.URL_CUSTOMER, customer);
  }

  deleteCustomer(id: number | undefined): Observable<Customer> {
    return this.http.delete<Customer>(this.URL_CUSTOMER + '/' + id);
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.URL_CUSTOMER + '/' + id);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    console.log('a' + customer);
    return this.http.patch<Customer>(this.URL_CUSTOMER + '/' + customer.id, customer);
  }
}
