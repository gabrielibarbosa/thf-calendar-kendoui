import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntlModule } from '@progress/kendo-angular-intl';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
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
  ],
  providers: [
    RoomService,
  ]
})
export class SchedulerYmsModule { }
