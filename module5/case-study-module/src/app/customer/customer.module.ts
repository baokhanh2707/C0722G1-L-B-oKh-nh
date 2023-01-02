import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import {FilterPipeModule} from 'ngx-filter-pipe';


@NgModule({
  declarations: [CustomerListComponent, CustomerCreateComponent, CustomerDeleteComponent, CustomerEditComponent, CustomerEditComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    FilterPipeModule
  ]
})
export class CustomerModule { }
