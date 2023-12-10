import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-management/employee-list/employee-list.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeAddComponent } from './employee-management/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-management/employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/add',
    component: EmployeeAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
