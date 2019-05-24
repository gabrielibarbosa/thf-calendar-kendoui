import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerNavigationComponent } from './scheduler-navigation/scheduler-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThfKendoModule } from '@totvs/thf-kendo';


import 'hammerjs';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ThfModule } from '@totvs/thf-ui';
import { RouterModule } from '@angular/router';
import { ToolbarService } from '@progress/kendo-angular-scheduler';

import '@progress/kendo-angular-intl/locales/pt/all';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { SchedulerEditFormComponent } from './edit-form.component';
import { EditService } from './edit.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    SchedulerNavigationComponent,
    SchedulerEditFormComponent
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
    EditService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
