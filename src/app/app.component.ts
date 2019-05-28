import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { EditMode, RemoveEvent, SchedulerEvent, CreateFormGroupArgs, SlotClickEvent, EventClickEvent } from '@progress/kendo-angular-scheduler';
import '@progress/kendo-date-math/tz/Brazil/East';
import { ThfMenuItem, ThfPageAction, ThfModalComponent, ThfCheckboxGroupOption, ThfModalAction } from '@totvs/thf-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'thf-calendar-kendoui';

  public editedEvent: any;
  public editMode: EditMode;
  public isNew: boolean;
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild('optionsForm') form: NgForm;

  @Input()
  public selectedDate: Date = new Date();

  public selectedViewIndex = 2;
  public formGroup: FormGroup;
  public evento: any = {};

  mask= "99:99";


  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

 
  public events: SchedulerEvent[] = [
    {
    id: 1,
    title: 'Breakfast',
    start: new Date(),
    end: new Date()
  }
];

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/' },
  ];

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Novo', action: this.add, icon: 'thf-icon-plus' }
  ];

  public readonly systemOptions: Array<ThfCheckboxGroupOption> = [
    { value: '1', label: 'Dia Inteiro' },
  ];

  action(button) {
    alert(`${button.label}`);
  }

  add(forms) {
    this.events = [...this.events, {
      id: this.getNextId(),
      title: forms.titulo,
      description: forms.descricao,
      startTimezone: forms.horaInicial,
      start: new Date(forms.start),
      end: new Date(forms.end),
      endTimezone: forms.horaFinal,
      recurrenceRule: null,
      isAllDay: forms.diaInteiro,

    }];
  }

  onClick($event) {
    console.log($event);
  }
  close: ThfModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true
  };

  confirm: ThfModalAction = {
    action: () => {
      console.log(this.evento);
       this.add(this.evento);
       this.form.reset();
       this.thfModal.close();
    },
    label: 'Confirm'
  };

  closeModal() {
    this.form.reset();
    this.thfModal.close();
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
    removeEvent.preventDefault();
    this.events = this.events.filter(event => {
      return event.id !== removeEvent.event.id;
    });
  }

  // eventDblClickHandler(eventClickEvent: EventClickEvent){
  //   // eventClickEvent.
  //   alert(9)
  // }
}
