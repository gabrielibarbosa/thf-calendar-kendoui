import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { ThfModule } from '@totvs/thf-ui';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoomService } from './room.service';
 
@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThfModule,
    HttpClientModule
  ],
  providers: [
    RoomService
  ]


})
export class RoomModule { }
