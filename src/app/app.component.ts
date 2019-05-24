import { Component, Input, ViewChild } from '@angular/core';
import { ThfMenuItem, ThfPageAction} from '@totvs/thf-ui';
import '@progress/kendo-date-math/tz/Brazil/East';
import { ThfModalAction, ThfModalComponent } from '@totvs/thf-ui/components/thf-modal';

import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EditMode, SchedulerEvent } from '@progress/kendo-angular-scheduler';

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

  primaryAction: ThfModalAction = {
    action: () => {
      this.thfModal.close();
    },
    label: 'Confirm'
  };
  secondaryAction: ThfModalAction = {
    action: () => {
      this.thfModal.close();
    },
    label: 'Cancel'
  };

  // openModal(){
  //   this.thfModal.open();
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
