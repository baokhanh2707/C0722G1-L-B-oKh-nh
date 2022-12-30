import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {element} from 'protractor';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../model/category';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_PRODUCT = 'http://localhost:3000/products';
  // // @ts-ignore
  // products: Product[] = [{
  //   id: 1,
  //   name: 'IPhone 12',
  //   price: 2400000,
  //   description: 'New'
  // }, {
  //   id: 2,
  //   name: 'IPhone 11',
  //   price: 1560000,
  //   description: 'Like new'
  // }, {
  //   id: 3,
  //   name: 'IPhone X',
  //   price: 968000,
  //   description: '97%'
  // }, {
  //   id: 4,
  //   name: 'IPhone 8',
  //   price: 7540000,
  //   description: '98%'
  // }, {
  //   id: 5,
  //   name: 'IPhone 11 Pro',
  //   price: 1895000,
  //   description: 'Like new'
  // }];

  // tslint:disable-next-line:typedef
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getAll() {
    return this.http.get<Category[]>(this.URL_PRODUCT);
  }

  // tslint:disable-next-line:typedef
  saveProduct(product: Product): Observable<Product> {
    return this.http.post(this.URL_PRODUCT, product);
  }
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL_PRODUCT}/${id}`);
  }

  updateProduct(id: number | undefined, product: Product): Observable<Product> {
    return this.http.put<Category>(`${this.URL_PRODUCT}/${id}`, product);
  }

  deleteProduct(id: number | undefined): Observable<Product> {
    return this.http.delete<Category>(`${this.URL_PRODUCT}/${id}`);
  }

}
