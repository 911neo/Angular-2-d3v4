import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { routing, appRoutingProviders } from './app.routes';

import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdIconModule} from '@angular2-material/icon';
import {MdIconRegistry} from '@angular2-material/icon';
import {MdInputModule} from '@angular2-material/input';
import {MdListModule} from '@angular2-material/list';
import {MdToolbarModule} from '@angular2-material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
