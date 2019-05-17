import { Component } from '@angular/core';
//import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
//import { sampleData, displayDate } from './events-utc';
import { ThfMenuItem, ThfPageAction } from '@totvs/thf-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thf-calendar-kendoui';

  public selectedViewIndex = 2;

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/' },
  ];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Novo' /*, action: this.add*/, icon: 'thf-icon-plus' }
  ];

  onClick($event) {
    console.log($event);
  }


  //  public selectedDate: Date = displayDate;
  //  public events: SchedulerEvent[] = sampleData;
}
