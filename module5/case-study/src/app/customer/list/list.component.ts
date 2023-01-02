import {Component, OnInit} from '@angular/core';
import {CustomerType} from "../customerType";
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  customers: Customer[] = []

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

   getAll() {
    this.customerService.getAll().subscribe(customer => {
      this.customers = customer
      console.log(customer)
    });
  }
}
