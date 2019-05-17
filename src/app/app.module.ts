import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChartModule } from '@progress/kendo-angular-charts';
import { GridModule } from '@progress/kendo-angular-grid';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThfKendoModule } from '@totvs/thf-kendo';


import 'hammerjs';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ThfModule } from '@totvs/thf-ui';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    ChartModule,
    GridModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    SchedulerModule,
    ThfModule,
    ThfKendoModule,
    RouterModule.forRoot([]),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
