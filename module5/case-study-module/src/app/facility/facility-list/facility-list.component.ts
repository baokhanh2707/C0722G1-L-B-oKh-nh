import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FacilityService} from '../facility.service';
import {Facility} from '../facility';
import {FacilityType} from '../facility-type';
import {RentType} from '../rent-type';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {
  facility: Facility[] = [];
  facilityType: FacilityType[] = [];
  rentType: RentType[] = [];

  constructor(private facilityService: FacilityService) {
    this.facilityService.getRentType().subscribe(data => {
      this.facilityType = data;
    });
    this.facilityService.getRentType().subscribe(data => {
      this.rentType = data;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.facilityService.getALl().subscribe(data => {
      this.facility = data;
    });
  }
}
