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
  readonly menus: Array<ThfMenuItem> = [
    { label: 'Home', link: '/home' },
    { label: 'Salas', link: '/rooms' },
  ];
}
