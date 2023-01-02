import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../customer-type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  formCustomer: FormGroup;
  customerType: CustomerType[] = [];

  constructor(private customerService: CustomerService,
              private route: Router) {
    this.formCustomer = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('KH-[0-9]{4}')]),
      name: new FormControl('', [Validators.required, Validators.pattern('([A-Z][a-z]+[ ])+([A-Z][a-z]+)')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      customerTypeId: new FormControl(),
      idCard: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})')]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address: new FormControl(),
    });
    this.customerService.getType().subscribe(data => {
      console.log(data);
      this.customerType = data;
    });
  }

  get id(): any {
    return this.formCustomer.get('id');
  }

  get name(): any {
    return this.formCustomer.get('name');
  }

  get idCard(): any {
    return this.formCustomer.get('idCard');
  }

  get phoneNumber(): any {
    return this.formCustomer.get('phoneNumber');
  }

  get email(): any {
    return this.formCustomer.get('email');
  }

  get gender(): any {
    return this.formCustomer.get('gender');
  }

  get dateOfBirth(): any {
    return this.formCustomer.get('dateOfBirth');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.customerService.saveCustomer(this.formCustomer.value).subscribe(data => {
      console.log(data);
      this.route.navigateByUrl('/customer');
    });
  }
}
