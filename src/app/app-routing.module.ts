import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

const routes: Routes = [
  { path: 'home', component: SchedulerComponent },
  { path: 'rooms', component: RoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
