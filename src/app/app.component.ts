import { Component, Input } from '@angular/core';
import { ThfMenuItem, ThfPageAction, ThfButtonGroupItem } from '@totvs/thf-ui';
import '@progress/kendo-date-math/tz/Brazil/East';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { EditMode, SlotClickEvent, EventClickEvent, CrudOperation, RemoveEvent, SchedulerEvent } from '@progress/kendo-angular-scheduler';

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

  public selectedViewIndex = 2;

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/' },
  ];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Novo', action: this.add, icon: 'thf-icon-plus' }
  ];

  // constructor(private formBuilder: FormBuilder) {
  //   this.createFormGroup = this.createFormGroup.bind(this);
  // }

  add() {
    this.events = [...this.events, {
      id: 5,
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
    // this.editService.read();
  }

  //    public createFormGroup(args: CreateFormGroupArgs): FormGroup {
  //     const dataItem = args.dataItem;

  //     this.formGroup = this.formBuilder.group({
  //         'id': args.isNew ? this.getNextId() : dataItem.id,
  //         'start': [dataItem.start, Validators.required],
  //         'end': [dataItem.end, Validators.required],
  //         'startTimezone': [dataItem.startTimezone],
  //         'endTimezone': [dataItem.endTimezone],
  //         'isAllDay': dataItem.isAllDay,
  //         'title': dataItem.title,
  //         'description': dataItem.description,
  //         'recurrenceRule': dataItem.recurrenceRule,
  //         'recurrenceId': dataItem.recurrenceId
  //     });

  //     return this.formGroup;
  // }

  // public isEditingSeries(editMode: EditMode): boolean {
  //   return editMode === EditMode.Series;
  // }

  // public getNextId(): number {
  //   const len = this.events.length;

  //   return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  // }

  //  public selectedDate: Date = displayDate;
  //  public events: SchedulerEvent[] = sampleData;
}
