import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyHistoryComponent } from './currency-history/currency-history.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    CurrencyConverterComponent,
    CurrencyHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    CurrencyListComponent,
    CurrencyConverterComponent,
    CurrencyHistoryComponent
  ]
})
export class AppModule { }
