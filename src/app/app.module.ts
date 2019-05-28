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
import {  SchedulerModule, ToolbarService, EditService } from '@progress/kendo-angular-scheduler';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { ThfModule } from '@totvs/thf-ui';
import 'hammerjs';

import '@progress/kendo-angular-intl/locales/pt/all';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RoomModule } from './room/room.module';
import { SchedulerYmsModule } from './scheduler/schedulerYms.module';


registerLocaleData(localePTPT);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    ThfModule,
    SchedulerYmsModule,
    RoomModule
    
  ],
  providers: [
    ToolbarService,
    EditService,
    {provide: LOCALE_ID, useValue: 'pt-PT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
