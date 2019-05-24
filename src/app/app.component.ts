import { Component, Input } from '@angular/core';
import { ThfMenuItem, ThfPageAction, ThfButtonGroupItem } from '@totvs/thf-ui';
import '@progress/kendo-date-math/tz/Brazil/East';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { EditService } from './edit.service';
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
    { label: 'Novo' /*, action: this.add*/, icon: 'thf-icon-plus' }
  ];

  onClick($event) {
    console.log($event);
  }

  constructor(private formBuilder: FormBuilder, public editService: EditService) {
  }

  public ngOnInit(): void {
    this.editService.read();
  }

  public slotDblClickHandler({ start, end, isAllDay }: SlotClickEvent): void {
    this.isNew = true;

    this.editMode = EditMode.Series;

    this.editedEvent = {
      Start: start,
      End: end,
      IsAllDay: isAllDay
    };
  }

  public eventDblClickHandler({ sender, event }: EventClickEvent): void {
    this.isNew = false;

    let dataItem = event.dataItem;

    if (this.editService.isRecurring(dataItem)) {
      sender.openRecurringConfirmationDialog(CrudOperation.Edit)
        // The dialog will emit `undefined` on cancel
        .pipe(filter(editMode => editMode !== undefined))
        .subscribe((editMode: EditMode) => {
          if (editMode === EditMode.Series) {
            dataItem = this.editService.findRecurrenceMaster(dataItem);
          }

          this.editMode = editMode;
          this.editedEvent = dataItem;
        });
    } else {
      this.editMode = EditMode.Series;
      this.editedEvent = dataItem;
    }
  }

  public saveHandler(formValue: any): void {
    if (this.isNew) {
      this.editService.create(formValue);
    } else {
      this.handleUpdate(this.editedEvent, formValue, this.editMode);
    }
  }

  public removeHandler({ sender, dataItem }: RemoveEvent): void {
    if (this.editService.isRecurring(dataItem)) {
      sender.openRecurringConfirmationDialog(CrudOperation.Remove)
        // result will be undefined if the Dialog was closed
        .pipe(filter(editMode => editMode !== undefined))
        .subscribe((editMode) => {
          this.handleRemove(dataItem, editMode);
        });
    } else {
      sender.openRemoveConfirmationDialog().subscribe((shouldRemove) => {
        if (shouldRemove) {
          this.editService.remove(dataItem);
        }
      });
    }
  }

  public cancelHandler(): void {
    this.editedEvent = undefined;
  }

  private handleUpdate(item: any, value: any, mode: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Occurrence) {
      if (service.isException(item)) {
        service.update(item, value);
      } else {
        service.createException(item, value);
      }
    } else {
      // Item is not recurring or we're editing the entire series
      service.update(item, value);
    }
  }

  private handleRemove(item: any, mode: EditMode): void {
    const service = this.editService;
    if (mode === EditMode.Series) {
      service.removeSeries(item);
    } else if (mode === EditMode.Occurrence) {
      if (service.isException(item)) {
        service.remove(item);
      } else {
        service.removeOccurrence(item);
      }
    } else {
      service.remove(item);
    }
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
