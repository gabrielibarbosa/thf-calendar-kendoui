import { registerLocaleData } from '@angular/common';
import localePTPT from '@angular/common/locales/pt-PT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ThfModule } from '@totvs/thf-ui';
import '@progress/kendo-angular-intl/locales/pt-PT/all';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    {provide: LOCALE_ID, useValue: 'pt-PT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
