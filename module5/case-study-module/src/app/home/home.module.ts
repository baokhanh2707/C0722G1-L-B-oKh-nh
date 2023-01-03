import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {FooterComponent} from './footer/footer.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';


@NgModule({
  declarations: [FooterComponent, NavigationComponent, HeaderComponent, BodyComponent],
  exports: [
    FooterComponent,
    NavigationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
