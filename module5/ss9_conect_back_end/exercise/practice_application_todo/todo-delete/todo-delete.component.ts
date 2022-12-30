import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Todo} from '../app-todo/todo';
import {TodoService} from '../todo.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.css']
})
export class TodoDeleteComponent implements OnInit {
  @Input()
  todo: Todo = {};
  subscription: Subscription | undefined;
  deleteForm: FormGroup = new FormGroup({});
  todoes: Todo[] = [];
  constructor(private todoService: TodoService, private route: Router) { }

  ngOnInit(): void {
  }

  deleteTodo() {
    this.todoService.deleteById(this.todo.id).subscribe(() =>{
      window.location.reload();
    });
  }



}
