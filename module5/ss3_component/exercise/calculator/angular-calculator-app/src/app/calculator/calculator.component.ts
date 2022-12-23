import {Component, OnInit} from '@angular/core';
import {Calculator} from './calculator';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  calculator: Calculator = {number1: 0, number2: 0, result: 0};

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  subtraction() {
    // @ts-ignore
    this.calculator.result = this.calculator.number1 - this.calculator.number2;
  }

  // tslint:disable-next-line:typedef
  multiplication() {
    // @ts-ignore
    this.calculator.result = this.calculator.number1 * this.calculator.number2;
  }

  // tslint:disable-next-line:typedef
  division() {
    // @ts-ignore
    this.calculator.result = this.calculator.number1 / this.calculator.number2;
  }

  // tslint:disable-next-line:typedef
  addition() {
    // @ts-ignore
    // tslint:disable-next-line:radix
    this.calculator.result = parseInt(this.calculator.number1) + parseInt(this.calculator.number2);
  }
}
