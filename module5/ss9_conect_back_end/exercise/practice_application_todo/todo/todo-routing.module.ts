import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TotoListComponent} from '../toto-list/toto-list.component';
import {TodoCreateComponent} from '../todo-create/todo-create.component';
import {TodoEditComponent} from '../todo-edit/todo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TotoListComponent,
  },
  {
    path: 'create',
    component: TodoCreateComponent,
  },
  {
    path: 'edit/:id',
    component: TodoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
