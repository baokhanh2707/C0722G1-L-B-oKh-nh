import { Component, OnInit } from '@angular/core';
import {Facility} from "../facility";
import {RentType} from "../rentType";
import {FacilityType} from "../facilityType";

@Component({
  selector: 'app-facility-create',
  templateUrl: './facility-create.component.html',
  styleUrls: ['./facility-create.component.css']
})
export class FacilityCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
