import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";
import {DeleteComponent} from "./delete/delete.component";

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'crate', component: CreateComponent
  },
  {
    path: 'edit', component: EditComponent
  },
  {
    path: 'delete', component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
