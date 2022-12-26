import { Component, OnInit } from '@angular/core';
import {Facility} from "../../model/facility/facility";
import {RentType} from "../../model/facility/rentType";
import {FacilityType} from "../../model/facility/facilityType";

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
