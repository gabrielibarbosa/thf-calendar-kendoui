import { Component, OnInit, Input } from '@angular/core';
import { ToolbarService } from '@progress/kendo-angular-scheduler';

@Component({
  selector: 'app-scheduler-navigation',
  templateUrl: './scheduler-navigation.component.html',
  styleUrls: ['./scheduler-navigation.component.scss']
})
export class SchedulerNavigationComponent{

  @Input()
  public selectedDate: Date;
  

  constructor(public toolbarService: ToolbarService) { }

  public next(): void {
    this.toolbarService.navigate({
      type: 'next'
    });
  }

  public prev(): void {
    this.toolbarService.navigate({
      type: 'prev'
    });
  }

}
