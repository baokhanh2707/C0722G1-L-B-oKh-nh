import { Component, OnInit } from '@angular/core';
import {Todo} from './todo';
import {FormControl} from '@angular/forms';

let _id = 1;

@Component({
  selector: 'app-app-todo',
  templateUrl: './app-todo.component.html',
  styleUrls: ['./app-todo.component.css']
})
export class AppTodoComponent implements OnInit {
  // todoes: Todo[] = [];
  // content = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

  // change(): void {
  //   const value = this.content.value;
  //   if (value){
  //     const todo: Todo = {
  //       id: _id++,
  //       content: value,
  //       complete: false
  //     };
  //     this.todoes.push(todo);
  //     this.content.reset();
  //   }
  // }

  // toggleTodo(i: number): void {
  //   this.todoes[i].complete = !this.todoes[i].complete;
  // }
}
