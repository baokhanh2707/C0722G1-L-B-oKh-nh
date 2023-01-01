import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {FacilityListComponent} from './facility/list/facility-list.component';
import {FacilityEditComponent} from './facility/edit/facility-edit.component';
import {FacilityCreateComponent} from './facility/create/facility-create.component';
import {ListComponent} from './customer/list/list.component';
import {CreateComponent} from './customer/create/create.component';
import {EditComponent} from './customer/edit/edit.component';
import {ContractCreateComponent} from './contract/create/contract-create.component';
import {BodyComponent} from './layout/body/body.component';
import {ContractListComponent} from './contract/list/contract-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    FacilityListComponent,
    FacilityEditComponent,
    FacilityCreateComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ContractCreateComponent,
    BodyComponent,
    ContractListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
