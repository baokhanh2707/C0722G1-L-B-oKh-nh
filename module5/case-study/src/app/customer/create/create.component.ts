import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerType} from "../../model/customer/customerType";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
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
formCustomer = new FormGroup({
  id:new FormControl('',[Validators.required,Validators.pattern('KH-[0-9]{4}')]),
  name: new FormControl('',[Validators.required,Validators.pattern("([A-Z][a-z]+[ ])+([A-Z][a-z]+)")]),
  dateOfBirth: new FormControl('',[Validators.required]),
  idCard: new FormControl('',[Validators.required,Validators.pattern("[0-9]{9}")]),
  phoneNumber:new FormControl('',[Validators.required,Validators.pattern("(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})")]),
  gender: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  address: new FormControl(),
})

  get id(){
    return this.formCustomer.get('id');
  }

  get name(){
    return this.formCustomer.get('name');
  }

  get idCard(){
    return this.formCustomer.get('idCard');
  }

  get phoneNumber(){
    return this.formCustomer.get('phoneNumber');
  }

  get email(){
    return this.formCustomer.get('email');
  }

  get gender(){
    return this.formCustomer.get('gender');
  }

  get dateOfBirth(){
  return this.formCustomer.get('dateOfBirth')
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.formCustomer);
    if(this.formCustomer.valid){
      this.eventCreate.emit(this.formCustomer.value)
    }
  }
}
