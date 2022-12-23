import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  color = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  colorSelect(target: any) {
    // @ts-ignore
    this.color = target.value;
  }
}
