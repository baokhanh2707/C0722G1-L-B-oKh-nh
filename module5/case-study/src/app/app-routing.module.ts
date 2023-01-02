import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'customer',
    loadChildren:()=>import('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path:'',
    loadChildren:()=>import('./layout/body/b.module').then(module => module.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
