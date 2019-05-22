import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ThfModule } from '@totvs/thf-ui';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNavigationComponent } from './my-navigation.component';
import { FormsModule } from '@angular/forms';
import { SchedulerNavigationComponent } from './scheduler-navigation/scheduler-navigation.component';






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
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
