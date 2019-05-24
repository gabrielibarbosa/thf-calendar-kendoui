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

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }
  public formGroup: FormGroup;

  title = 'thf-calendar-kendoui';
  @Input()
  public selectedDate: Date = new Date();
  public events: SchedulerEvent[] = [
    {
    id: 1,
    title: 'Breakfast',
    start: new Date(),
    end: new Date()
  }
];

  public editedEvent: any;
  public editMode: EditMode;
  public isNew: boolean;
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild('optionsForm') form: NgForm;

  public selectedViewIndex = 2;

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/' },
  ];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Novo', action: this.add, icon: 'thf-icon-plus' }
  ];

  action(button) {
    alert(`${button.label}`);
  }

  // public editedEvent: any;
  // public editMode: EditMode;
  // public isNew: boolean;

  // action(button) {
  //   alert(`${button.label}`);
  // }


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

  public ngOnInit(): void {
    // this.editService.read();
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: args.isNew ? this.getNextId() : dataItem.id,
      start: [dataItem.start, Validators.required],
      end: [dataItem.end, Validators.required],
      startTimezone: [dataItem.startTimezone],
      endTimezone: [dataItem.endTimezone],
      isAllDay: dataItem.isAllDay,
      title: dataItem.title,
      description: dataItem.description,
      recurrenceRule: dataItem.recurrenceRule,
      recurrenceId: dataItem.recurrenceId
    });

    return this.formGroup;
  }

  public getNextId(): number {
    const len = this.events.length;

    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  }

  removeHandler(removeEvent: RemoveEvent) {
    alert("OPA");
    removeEvent.preventDefault();
    this.events = this.events.filter(event => {
      return event.id !== removeEvent.event.id;
    });
  }
}
