import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FacilityListComponent} from './facility-list/facility-list.component';
import {FacilityCreateComponent} from './facility-create/facility-create.component';
import {FacilityEditComponent} from './facility-edit/facility-edit.component';
import {FacilityDeleteComponent} from './facility-delete/facility-delete.component';

const routes: Routes = [
  {
    path: '', component: FacilityListComponent
  },
  {
    path: '/create', component: FacilityCreateComponent
  },
  {
    path: '/edit', component: FacilityEditComponent
  },
  {
    path: '/delete', component: FacilityDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityRoutingModule {
}
