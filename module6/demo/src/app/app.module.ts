import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import {FormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    CkeditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
