import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractEditComponent } from './contract-edit/contract-edit.component';
import { ContractDeleteComponent } from './contract-delete/contract-delete.component';


@NgModule({
  declarations: [ContractListComponent, ContractCreateComponent, ContractEditComponent, ContractDeleteComponent],
  imports: [
    CommonModule,
    ContractRoutingModule
  ]
})
export class ContractModule { }
