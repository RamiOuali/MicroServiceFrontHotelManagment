import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.mpdel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  constructor(private service: EmployeeService) {}
  ngOnInit(): void {
    this.formList();
  }
  employeeForm: FormGroup;
  emp = new Employee();
  formList() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employeeForm, [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl(this.employeeForm, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(this.employeeForm, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(this.employeeForm, [Validators.required]),
      salary: new FormControl(this.employeeForm, [Validators.required]),
      role: new FormControl(this.employeeForm, [Validators.required]),
    });
  }
  get form() {
    return this.employeeForm.controls;
  }

  addEmp() {
    this.service.addEmployee(this.emp).subscribe({
      next: (data) => console.log('added'),
      error: (error) => console.log('error', error),
    });
  }
  onSubmit() {
    console.log(this.emp);
    this.addEmp();
  }
}
