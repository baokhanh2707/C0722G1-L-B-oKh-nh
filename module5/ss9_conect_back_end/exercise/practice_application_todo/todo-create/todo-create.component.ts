import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {FormControl, FormGroup} from '@angular/forms';
import {TodoService} from '../todo.service';

import {Router} from '@angular/router';
@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({});
  constructor(private todoService: TodoService, private route: Router) {
    this.todoForm = new FormGroup({
      id: new FormControl(''),
      content: new FormControl(''),
      complete: new FormControl(false),
    });
  }

  ngOnInit(): void {
  }

  saveTodo() {
    this.todoService.save(this.todoForm.value).subscribe(data => {
      console.log(data);
      this.route.navigateByUrl("");
    }, error => {}, () => {});
  }
}
