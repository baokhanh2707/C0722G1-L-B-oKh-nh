import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerType} from "../customerType";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output()
  eventCreate = new EventEmitter();
  customerTypes: CustomerType[] = [
    {
      id: 1,
      name: 'Diamond'
    },
    {
      id: 2,
      name: 'Platinium'
    },
    {
      id: 3,
      name: 'Gold'
    },
    {
      id: 4,
      name: 'Silver'
    },
    {
      id: 5,
      name: 'Member'
    }
  ]
  formEdit = new FormGroup({
    id:new FormControl('',[Validators.required,Validators.pattern('KH-[0-9]{4}')]),
    name: new FormControl('',[Validators.required,Validators.pattern("([A-Z][a-z]+[ ])+([A-Z][a-z]+)")]),
    dateOfBirth: new FormControl('',[Validators.required]),
    customerTypeId: new FormControl(),
    idCard: new FormControl('',[Validators.required,Validators.pattern("[0-9]{9}")]),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern("(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})")]),
    gender: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    address: new FormControl(),
  })
  get id(){
    return this.formEdit.get('id');
  }

  get name(){
    return this.formEdit.get('name');
  }

  get idCard(){
    return this.formEdit.get('idCard');
  }

  get phoneNumber(){
    return this.formEdit.get('phoneNumber');
  }

  get email(){
    return this.formEdit.get('email');
  }

  get gender(){
    return this.formEdit.get('gender');
  }

  get dateOfBirth(){
    return this.formEdit.get('dateOfBirth')
  }
  constructor() {

  }

  ngOnInit(): void {
  }

  edit() {
    console.log(this.formEdit.value)
  }
}
