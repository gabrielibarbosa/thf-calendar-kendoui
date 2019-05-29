import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DragEndEvent, EventClickEvent, Group, RemoveEvent, Resource } from '@progress/kendo-angular-scheduler';
import { ThfModalAction, ThfModalComponent } from '@totvs/thf-ui';
import { RoomService } from '../room/room.service';
import { Event } from '../model/event';

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
  public evento: Event = new Event();
  public hourMask = '99:99';
  public events: Array<Event> = [
    {
      id: 1,
      title: 'Breakfast',
      start: new Date(),
      end: new Date(),
      roomId: 1
    }
  ];

  public rooms = [];

  public orientation = 'horizontal';

  public editable: boolean = true;

  public group: Group = {
    resources: ['Rooms'],
    orientation: 'horizontal'
  };

  public resources: Array<Resource> = [{
    name: 'Rooms',
    data: [],
    field: 'roomId',
    valueField: 'value',
    textField: 'text',
    colorField: 'color'
  }];


  public close: ThfModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar'
  };

  public confirm: ThfModalAction = {
    action: () => {
      this.add();
      this.form.reset();
      this.thfModal.close();
    },
    label: 'Salvar'
  };

  constructor(private roomService: RoomService) {
  }

  public onOrientationChange(value: 'horizontal' | 'vertical'): void {
    this.group = { ...this.group, orientation: value };
  }

  public ngOnInit(): void {
    this.loadResourcesEvents();
  }

  public loadResourcesEvents() {
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

  public action(button) {
    alert(`${button.label}`);
  }

  public add() {
    const horarioInicio = this.dateWithoutTimezone(this.evento.start);
    horarioInicio.setHours(+this.evento.initialHour.substring(0, 2), +this.evento.initialHour.substring(2, 4), 0, 0);

    const horarioFinal = this.dateWithoutTimezone(this.evento.end);
    horarioFinal.setHours(+this.evento.finalHour.substring(2, 4).substring(0, 2), +this.evento.finalHour.substring(2, 4), 0, 0);

    if (this.evento.id) {
      this.events = this.events.map(event => {
        if (this.evento.id === event.id) {
          event.title = this.evento.title,
            event.description = this.evento.description;
          event.start = horarioInicio;
          event.end = horarioFinal;
          event.isAllDay = this.evento.isAllDay;
          event.roomId = this.evento.roomId;
        }
        return event;
      });
    } else {
      this.events = [...this.events, {
        id: this.getNextId(),
        title: this.evento.title,
        description: this.evento.description,
        start: horarioInicio,
        end: horarioFinal,
        isAllDay: this.evento.isAllDay,
        roomId: this.evento.roomId
      }];
    }
  }

  public closeModal() {
    this.form.reset();
    this.thfModal.close();
  }

  public getNextId(): number {
    const len = this.events.length;

    return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
  }

  public removeHandler(removeEvent: RemoveEvent) {
    this.events = this.events.filter(event => {
      return event.id !== removeEvent.event.id;
    });
  }

  public dragEnd(dragEvent: DragEndEvent) {
    this.events = this.events.map((event) => {
      if (dragEvent.event.id === event.id) {
        event.start = dragEvent.start;
        event.end = dragEvent.end;
        event.roomId = dragEvent.resources.roomId;
      }
      return event;
    });
  }

  public resizeHandler(resizeEndEvent: DragEndEvent) {
    this.events = this.events.map(event => {
      if (event.id === resizeEndEvent.event.id) {
        event.start = resizeEndEvent.start;
        event.end = resizeEndEvent.end;
        event.roomId = resizeEndEvent.dataItem.roomId;
      }
      return event;
    });
  }

  public eventDblClickHandler(eventClickEvent: EventClickEvent) {
    this.evento.id = eventClickEvent.event.dataItem.id;
    this.evento.title = eventClickEvent.event.dataItem.title;
    this.evento.description = eventClickEvent.event.dataItem.description;
    this.evento.start = eventClickEvent.event.dataItem.start;
    this.evento.end = eventClickEvent.event.dataItem.end;
    this.evento.roomId = eventClickEvent.event.dataItem.roomId;

    this.evento.initialHour = this.getHours(eventClickEvent.event.dataItem.start) + '' +
      this.getMinute(eventClickEvent.event.dataItem.start);

    this.evento.finalHour = this.getHours(eventClickEvent.event.dataItem.end) + '' +
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

  public openModal() {
    this.thfModal.open();
  }

  public onSchedulerViewChange(event) {
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
