import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { EditMode, RemoveEvent, SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import '@progress/kendo-date-math/tz/Brazil/East';
import { ThfMenuItem, ThfPageAction, ThfModalComponent } from '@totvs/thf-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public formGroup: FormGroup;

  title = 'thf-calendar-kendoui';
  @Input()
  public selectedDate: Date = new Date('2019-05-23T00:00:00');
  public events: SchedulerEvent[] = [{
    id: 1,
    title: 'Breakfast',
    start: new Date('2018-10-22T09:00:00'),
    end: new Date('2018-10-22T09:30:00'),
    recurrenceRule: 'FREQ=DAILY;COUNT=5;'
  }];

  public editedEvent: any;
  public editMode: EditMode;
  public isNew: boolean;

  action(button) {
    alert(`${button.label}`);
  }
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild('optionsForm') form: NgForm;

  public selectedViewIndex = 2;

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/' },
  ];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Novo', action: this.add, icon: 'thf-icon-plus' }
  ];

  add() {
    this.events = [...this.events, {
      id: this.getNextId(),
      title: 'Take the dog to the vet',
      description: '', 
      startTimezone: null,
      start: new Date(),
      end: new Date(),
      endTimezone: null,
      recurrenceRule: null,
      isAllDay: false
    }];
  }

  onClick($event) {
    console.log($event);
  }

  constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
  }

 
  public getNextId(): number {
    const len = this.events.length;

    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  }

  removeHandler(removeEvent: RemoveEvent) {
    removeEvent.preventDefault();
    this.events = this.events.filter(event => {
      return event.id !== removeEvent.event.id;
    });
  }
}
