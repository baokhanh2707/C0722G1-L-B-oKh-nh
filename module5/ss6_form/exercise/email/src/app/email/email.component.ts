import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Country} from "../country";


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  countryList: Country[] = [{id: '1', name: 'Đà Nẵng'}, {id: '2', name: 'Huế'}, {id: '1', name: 'Quảng Trị'}
  ];

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    country: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    age: new FormControl('', [Validators.min(18)]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,Validators.pattern('^[+]+[8]+[4]+[0-9]{9}$')],[]),
  });

  get email() {
    return this.contactForm.get('email')
  }

  get password() {
    return this.contactForm.get('password')
  }

  get country() {
    return this.contactForm.get('country')
  }

  get confirmPass() {
    return this.contactForm.get('confirmPass')
  }

  get age() {
    return this.contactForm.get('age')
  }

  get gender() {
    return this.contactForm.get('gender')
  }

  get phone() {
    return this.contactForm.get('phone')
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }
}
