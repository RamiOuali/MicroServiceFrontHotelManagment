import { ReclamationsComponent } from './Reclamations/reclamations/reclamations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-management/employee-list/employee-list.component';
//import { AuthGuard } from './guard/auth.guard';
import { EmployeeAddComponent } from './employee-management/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-management/employee-edit/employee-edit.component';
import { AllEventsComponent } from './event-management/all-events/all-events.component';
import { RoomListComponent } from './Room/room-list/room-list.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeListComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'employee/add',
    component: EmployeeAddComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'event',
    loadChildren: () => import('./event-management/event-management.module').then(m => m.EventManagementModule),
  },
  {
    path: 'res',
    loadChildren: () => import('./reservations-management/reservation.module').then(m => m.ReservationModule),
  },
  {
    path: 'rooms',
    component: RoomListComponent,
  //  canActivate: [AuthGuard],
  },
  {
    path: 'reclamation',
    component: ReclamationsComponent,
  //  canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
