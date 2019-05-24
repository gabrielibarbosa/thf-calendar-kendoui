import { registerLocaleData } from '@angular/common';
import localePTPT from '@angular/common/locales/pt-PT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerNavigationComponent } from './scheduler-navigation/scheduler-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import '@progress/kendo-angular-intl/locales/pt-PT/all';
import '@progress/kendo-angular-intl/locales/pt/all';
import {  SchedulerModule, ToolbarService } from '@progress/kendo-angular-scheduler';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { ThfModule } from '@totvs/thf-ui';
import 'hammerjs';

import '@progress/kendo-angular-intl/locales/pt/all';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';


registerLocaleData(localePTPT);

@NgModule({
  declarations: [
    AppComponent,
    SchedulerNavigationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SchedulerModule,
    ThfModule,
    ThfKendoModule,
    IntlModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot([]),
    DateInputsModule,
  ],
  providers: [
    ToolbarService,
    {provide: LOCALE_ID, useValue: 'pt-PT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
