import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  URL_CATEGORY = 'http://localhost:3000/categories';
  categories: Category[] = [{
    id: 1,
    name: 'IPhone'
  }, {
    id: 2,
    name: 'Samsung',
  }, {
    id: 3,
    name: 'LG',
  }];
  constructor(private http: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL_CATEGORY);
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post(this.URL_CATEGORY, category);
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.URL_CATEGORY}/${id}`);
  }

  updateCategory(id: number | undefined, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.URL_CATEGORY}/${id}`, category);
  }

  deleteCategory(id: number | undefined): Observable<Category> {
    return this.http.delete<Category>(`${this.URL_CATEGORY}/${id}`);
  }


}
