import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // tslint:disable-next-line:typedef
  get email() {
    return this.loginForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.loginForm.get('password');
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.loginForm.value);
  }
}
