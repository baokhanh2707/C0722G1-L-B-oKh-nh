import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {CustomerType} from '../customer-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  customerTypeId: CustomerType[] = [];
  p = 1;
  temp: Customer | undefined;
  // userFilter: any = {name: '', address: ''};
  formCustomerSearch: FormGroup = new FormGroup({
    name: new FormControl(),
    customerTypeId: new FormControl()
  });

  constructor(private customerService: CustomerService) {
    this.customerService.getType().subscribe(data => {
      this.customerTypeId = data;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.customerService.getAll(this.formCustomerSearch.value.name, this.formCustomerSearch.value.customerTypeId).subscribe(customer => {
      this.customers = customer;
      console.log(customer);
    });
  }

  reload(): void {
    this.getAll();
  }

  search(): void {
    this.customerService.getAll(this.formCustomerSearch.value.name, this.formCustomerSearch.value.customerTypeId).subscribe(data => {
      this.customers = data;
      this.p = 1;
    });
  }
}
