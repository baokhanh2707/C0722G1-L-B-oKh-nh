import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {
  @Input()
  customer: Customer | undefined = {};
  @Output()
  eventDelete = new EventEmitter();

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
  }

  delete(): any {
    if (this.customer !== undefined) {
      const id = this.customer.id;
      this.customerService.deleteCustomer(id).subscribe(data => {
        document.getElementById('exampleModal')?.click();
        this.eventDelete.emit();
        alert('xoá thành công');
      }, error => {
      }, () => {
      });
    }
  }
}
