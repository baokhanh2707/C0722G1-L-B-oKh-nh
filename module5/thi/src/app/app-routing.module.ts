import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'create', component: CreateComponent
  },
  {
    path: 'edit/:id', component: EditComponent
  },
  {
    path: 'delete/:id', component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
