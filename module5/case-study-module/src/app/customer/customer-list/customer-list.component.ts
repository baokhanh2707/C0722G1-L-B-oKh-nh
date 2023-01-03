import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {CustomerType} from '../customer-type';

@Component({
  selector: 'app-customer-list',
  templateUrl:  './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  customerType: CustomerType[] = [];
  p = 1;
  temp: Customer | undefined;
  userFilter: any = {name: '', address: ''};

  constructor(private customerService: CustomerService) {
    this.customerService.getType().subscribe(data => {
      this.customerType = data;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.customerService.getAll().subscribe(customer => {
      this.customers = customer;
      console.log(customer);
    });
  }

  reload(): void {
    this.getAll();
  }
}
