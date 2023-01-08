import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer.service';
import {CustomerType} from '../customer-type';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  formEdit: FormGroup;
  customerType: CustomerType[] = [];

  compareWith(object1: Customer, object2: Customer): boolean {
    return object1 && object2 ? object1.id === object2.id : object1 === object2;
  }

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.formEdit = new FormGroup({
      customerCode: new FormControl('', [Validators.required, Validators.pattern('KH-[0-9]{4}')]),
      id: new FormControl(''),
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
      this.customerType = data;
    });
    // lấy tham số của url là id đem vào service
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.getCustomer(+id);
      }
    });
  }

  get customerCode(): any {
    return this.formEdit.get('customerCode');
  }

  get name(): any {
    return this.formEdit.get('name');
  }

  get idCard(): any {
    return this.formEdit.get('idCard');
  }

  get phoneNumber(): any {
    return this.formEdit.get('phoneNumber');
  }

  get email(): any {
    return this.formEdit.get('email');
  }

  get gender(): any {
    return this.formEdit.get('gender');
  }

  get dateOfBirth(): any {
    return this.formEdit.get('dateOfBirth');
  }

  ngOnInit(): void {
  }

  getCustomer(id: number): void {
    this.customerService.findById(id).subscribe(data => {
      this.formEdit.patchValue(data);
    });
  }

  edit(): void {
    this.customerService.editCustomer(this.formEdit.value).subscribe(data => {
      console.log('c.ts' + data);
      alert('sửa thành công');
      this.router.navigateByUrl('/customer');
    });
  }
}
