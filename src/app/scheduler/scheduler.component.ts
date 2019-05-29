import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreateFormGroupArgs, DragEndEvent, EventClickEvent, RemoveEvent } from '@progress/kendo-angular-scheduler';
import { ThfCheckboxGroupOption, ThfModalAction, ThfModalComponent } from '@totvs/thf-ui';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild('optionsForm') form: NgForm;

  public selectedDate: Date = new Date();

  public selectedViewIndex = 1;
  public formGroup: FormGroup;
  public evento: any = {};
  public rooms = [];
  mask = '99:99';

  public events: any = [
    {
      id: 1,
      title: 'Breakfast',
      start: new Date(),
      end: new Date(),
      roomId: 1
    }
  ];

  public readonly systemOptions: Array<ThfCheckboxGroupOption> = [
    { value: '1', label: 'Dia Inteiro' },
  ];

  close: ThfModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar'
  };

  confirm: ThfModalAction = {
    action: () => {
      console.log(this.evento);
      this.add(this.evento);
      this.form.reset();
      this.thfModal.close();
    },
    label: 'Salvar'
  };

  orientation = 'horizontal';

  public group: any = {
    resources: ['Rooms'],
    orientation: 'horizontal'
  };

  public resources: any[] = [{
    name: 'Rooms',
    data: [],
    field: 'roomId',
    valueField: 'value',
    textField: 'text',
    colorField: 'color'
  }];


  constructor(private formBuilder: FormBuilder, private roomService: RoomService) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public onOrientationChange(value: any): void {
    this.group = { ...this.group, orientation: value };
  }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms: any) => {
      this.rooms = rooms;
      this.rooms = rooms.map(room => {
        return { value: room.value, label: room.text };
      });
      const resources = this.resources.map(resource => {
        resource.data = rooms;
        return resource;
      });
      this.resources = resources;
    });
  }

  action(button) {
    alert(`${button.label}`);
  }

  add(forms) {
    console.log(forms.start);
    const horarioInicio = this.dateWithoutTimezone(forms.start);
    horarioInicio.setHours(forms.horaInicial.substring(0, 2), forms.horaInicial.substring(2, 4), 0, 0);

    const horarioFinal = this.dateWithoutTimezone(forms.end);
    horarioFinal.setHours(forms.horaFinal.substring(0, 2), forms.horaFinal.substring(2, 4), 0, 0);

    this.events = [...this.events, {
      id: this.getNextId(),
      title: forms.titulo,
      description: forms.descricao,
      startTimezone: null,
      start: horarioInicio,
      end: horarioFinal,
      endTimezone: null,
      recurrenceRule: null,
      isAllDay: forms.diaInteiro,
      roomId: forms.roomId
    }];
  }

  onClick($event) {
    console.log($event);
  }


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

  dragEnd(dragEvent: DragEndEvent) {
    console.log(dragEvent.start);
    this.events = this.events.map((event) => {
      if (dragEvent.event.id === event.id) {
        event.start = dragEvent.start;
        event.end = dragEvent.end;
      }
      return event;
    });
  }
  resizeHandler(resizeEndEvent: DragEndEvent) {
    console.log(resizeEndEvent);
    this.events = this.events.map(event => {
      if (event.id === resizeEndEvent.event.id) {
        event.start = resizeEndEvent.start;
        event.end = resizeEndEvent.end;
      }
      return event;
    });
  }

  eventDblClickHandler(eventClickEvent: EventClickEvent) {
    this.evento.titulo = eventClickEvent.event.dataItem.title;
    this.evento.descricao = eventClickEvent.event.dataItem.description;
    this.evento.start = eventClickEvent.event.dataItem.start;
    this.evento.end = eventClickEvent.event.dataItem.end;

    this.evento.horaInicial = this.getHours(eventClickEvent.event.dataItem.start) + '' +
      this.getMinute(eventClickEvent.event.dataItem.start);

    this.evento.horaFinal = this.getHours(eventClickEvent.event.dataItem.end) + '' +
      this.getMinute(eventClickEvent.event.dataItem.end);

    this.thfModal.open();
  }

  private getHours(date) {
    return date.getHours();
  }

  private getMinute(date) {
    if (date.getMinutes() < 10) {
      return '0' + date.getMinutes();
    }
    return date.getMinutes();
  }

  openModal() {
    this.thfModal.open();
  }

  onSchedulerViewChange(event) {
    if (event !== 1) {
      this.group = undefined;
    } else {
      this.group = {
        resources: ['Rooms'],
        orientation: 'horizontal'
      };
    }
  }

  private dateWithoutTimezone(date) {
    return new Date(date.substr(0, 10).replace(/-/g, '/'));
  }

}
