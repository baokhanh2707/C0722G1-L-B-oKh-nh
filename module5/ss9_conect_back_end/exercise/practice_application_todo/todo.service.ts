import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './app-todo/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  URL_TODOES = 'http://localhost:3000/todoes';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.URL_TODOES);
  }

  save(todo: any) {
    return this.httpClient.post(this.URL_TODOES, todo);
  }

  findById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(this.URL_TODOES + '/' + id);
  }

  edit(id: number, todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.URL_TODOES + '/' + id, todo);
  }

  deleteById(id: number | undefined): Observable<Todo> {
    return this.httpClient.delete(this.URL_TODOES + '/' + id);
  }
}
