import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import {TotoListComponent} from '../toto-list/toto-list.component';
import {AppTodoComponent} from '../app-todo/app-todo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TodoCreateComponent} from '../todo-create/todo-create.component';
import {TodoEditComponent} from '../todo-edit/todo-edit.component';
import {TodoDeleteComponent} from '../todo-delete/todo-delete.component';


@NgModule({
  declarations: [
    AppTodoComponent,
    TotoListComponent,
    TodoCreateComponent,
    TodoEditComponent,
    TodoDeleteComponent
  ],
  exports: [
    AppTodoComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
