import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.mpdel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  emp = new Employee();
  empForm: FormGroup;
  employeeForm: FormGroup;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.service.getEmployeeById(Number(id)).subscribe((data) => {
        this.emp = data;
        this.formList();
      });
    });
  }
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
  editEmp() {
    this.service.update(this.emp).subscribe({
      next: (data) => console.log('added'),
      error: (error) => console.log('error', error),
    });
  }
  onSubmit() {
    this.editEmp();
  }

}
