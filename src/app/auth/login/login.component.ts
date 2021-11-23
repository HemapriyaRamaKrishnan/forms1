import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/apiFolder/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formInput: any = FormGroup;
  employeeData: any;
  eId: any;
  isAdd!: boolean;
  isUpdate!: boolean;
  rowId!: number;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.getEmployee();
    this.formInput = this.fb.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
      mobileNo: [''],
      salary: ['']
    })
  }
  onSubmit() {
    let payLoad = {
      firstName: this.formInput.value.firstName,
      lastName: this.formInput.value.lastName,
      emailId: this.formInput.value.emailId,
      mobileNo: this.formInput.value.mobileNo,
      salary: this.formInput.value.salary
    }
    console.log('firstname value', this.formInput.value.firstName)

    this.api.postEmployee(payLoad)
      .subscribe((res: any) => {
        console.log('response', res)
        var ref = document.getElementById('cancel')
        ref?.click()
      })
  }
  getEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }
  deleteEmployee(i: any) {
    this.api.deleteEmployee(i.id)
      .subscribe((res) => {
        alert("employee Deleted successfully")
      })
  }
  onEdit(c: any) {
    this.rowId = c.id;
    this.isAdd = false;
    this.isUpdate = true;
    this.formInput.controls['firstName'].setvalue(c.firstName);
  }
  addEmp() {
    this.isAdd = true;
    this.isUpdate = false;
  }
  updateEmployee() {
    let payLoad = {
      firstName: this.formInput.value.firstName,
      lastName: this.formInput.value.lastName,
      emailId: this.formInput.value.emailId,
      mobileNo: this.formInput.value.mobileNo,
      salary: this.formInput.value.salary
    }
    this.api.updateEmployee(payLoad, this.rowId)
      .subscribe((res) => {
      })
  }
}
