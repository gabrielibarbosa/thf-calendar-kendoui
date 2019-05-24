import { registerLocaleData } from '@angular/common';
import localePTPT from '@angular/common/locales/pt-PT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import '@progress/kendo-angular-intl/locales/pt-PT/all';
import '@progress/kendo-angular-intl/locales/pt/all';
import { EditService, SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { ThfModule } from '@totvs/thf-ui';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerNavigationComponent } from './scheduler-navigation/scheduler-navigation.component';



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
    EditService,
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
