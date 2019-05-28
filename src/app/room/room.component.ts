import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { ThfTableColumn, ThfTableAction } from '@totvs/thf-ui';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  readonly tableColumns: Array<ThfTableColumn> = [
    { property: 'value', label: 'Id' },
    { property: 'text', label: 'Nome' },
    { property: 'color', label: 'Cor' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar sala',
      action: this.editar.bind(this),
      icon: 'thf-icon thf-icon-edit',

    },
    {
      label: 'Excluir',
      action: this.deletar.bind(this),
      icon: 'thf-icon thf-icon-delete'
    }
  ];

  room: any = {
    text: '',
    color: '#000000'
  };

  rooms: any = [];


  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.loadRooms();
  }

  editar(room) {
    this.room = {
      value: room.value,
      text: room.text,
      color: room.color
    };
  }

  deletar(room) {
    this.roomService.deleteRoom(room.value).subscribe(room => {
      this.loadRooms();
    });
  }

  salvarSala() {
    if(this.room.value) {
      this.roomService.updateRoom(this.room).subscribe(room => {
        this.room = {
          value: undefined,
          text: '',
          color: '#000000'
        };
        this.loadRooms();
      });
    } else {
      this.roomService.saveRoom(this.room).subscribe(room => {
        this.room = {
          value: undefined,
          text: '',
          color: '#000000'
        };
        this.loadRooms();
      });
    }
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
}
