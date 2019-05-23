import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import '@progress/kendo-angular-intl/locales/pt/all';
import { SchedulerModule, ToolbarService } from '@progress/kendo-angular-scheduler';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { ThfModule } from '@totvs/thf-ui';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerNavigationComponent } from './scheduler-navigation/scheduler-navigation.component';
import '@progress/kendo-angular-intl/locales/pt-PT/all';
import localePTPT from '@angular/common/locales/pt-PT';
import { registerLocaleData } from '@angular/common';




registerLocaleData(localePTPT);

@NgModule({
  declarations: [
    AppComponent,
    SchedulerNavigationComponent
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
