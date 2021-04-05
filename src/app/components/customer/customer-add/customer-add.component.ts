import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  createCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
    })
  }

}
