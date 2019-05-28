import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EditMode, Resource, CreateFormGroupArgs, RemoveEvent, SchedulerEvent, DragEndEvent } from '@progress/kendo-angular-scheduler';
import { ThfModalComponent, ThfMenuItem, ThfPageAction, ThfModalAction, ThfCheckboxGroupOption } from '@totvs/thf-ui';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {  
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

  action(button) {
    alert(`${button.label}`);
  }

  add(forms) {

    let horarioInicio = new Date(forms.start);
    horarioInicio.setHours(forms.horaInicial.substring(0,2),forms.horaInicial.substring(2,4),0,0);
    console.log(horarioInicio);

    let horarioFinal = new Date(forms.end)
    horarioFinal.setHours(forms.horaFinal.substring(0,2),forms.horaFinal.substring(2,4),0,0);
    console.log(horarioFinal);

    this.events = [...this.events, {
      id: this.getNextId(),
      title: forms.titulo,
      description: forms.descricao,
      startTimezone: null,
      start: horarioInicio,
      end: horarioFinal,
      endTimezone: null ,
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

  dragEnd(dragEvent: DragEndEvent){
    dragEvent.event;
    console.log(dragEvent.start);
    this.events = this.events.map((event)=>{
      if(dragEvent.event.id == event.id){
        event.start =  dragEvent.start;
        event.end = dragEvent.end;
      }
      return event;
     })
  }
  // eventDblClickHandler(eventClickEvent: EventClickEvent){
  //   // eventClickEvent.
  //   alert(9)
  // }

}
