import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { EditService, SchedulerModule, ToolbarService } from '@progress/kendo-angular-scheduler';
import { ThfKendoModule } from '@totvs/thf-kendo';
import { ThfModule } from '@totvs/thf-ui';
import { RoomService } from '../room/room.service';
import { SchedulerNavigationComponent } from '../scheduler-navigation/scheduler-navigation.component';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent, SchedulerNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    SchedulerModule,
    ThfModule,
    ThfKendoModule,
    IntlModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DateInputsModule
  ],
  providers: [
    RoomService,
    ToolbarService,
    EditService,
  ]
})
export class SchedulerYmsModule { }
