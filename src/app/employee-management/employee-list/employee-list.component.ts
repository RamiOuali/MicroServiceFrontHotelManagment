import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.mpdel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(private service: EmployeeService, private router: Router, private route:ActivatedRoute) {}
  employeeList: Employee[] = [];
  ngOnInit(): void {
    this.service.getAllEmployees().subscribe({
      next: (data) => (this.employeeList = data),
      error: (error) => console.log(error),
    });
    console.log(this.employeeList);
  }
  deleteEmp(id: number) {
    this.service.delete(id).subscribe({
      next: (data) =>  this.router.navigate(["/employee"]),
      error: (error) => console.log('error', error),
    });
    this.router.navigate(["/employee"], { relativeTo: this.route.parent });

  }
}
