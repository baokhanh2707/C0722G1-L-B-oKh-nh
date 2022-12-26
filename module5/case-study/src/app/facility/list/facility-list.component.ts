import { Component, OnInit } from '@angular/core';
import {Facility} from "../../model/facility/facility";
import {RentType} from "../../model/facility/rentType";
import {FacilityType} from "../../model/facility/facilityType";

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {
  facility: Facility = {};

  year: RentType = {
    id: 1,
    name: 'year'
  };
  month: RentType = {
    id: 2,
    name: 'month'
  };
  date: RentType = {
    id: 3,
    name: 'date'
  };
  hours: RentType = {
    id: 4,
    name: 'hours'
  };

  villa: FacilityType = {
    id: 1,
    name: 'villa'
  };
  house: FacilityType = {
    id: 2,
    name: 'house'
  };
  room: FacilityType = {
    id: 3,
    name: 'room'
  };

  facilityList: Facility[] = [
    {
      image: "https://e8rbh6por3n.exactdn.com/sites/uploads/2020/05/villa-la-gi-thumbnail-770x515.jpg?strip=all&lossy=1&ssl=1",
      id: 1,
      name: 'Villa Beach Front',
      area: 2500,
      cost: 1000000,
      maxPeople: 10,
      facilityType: this.villa,
      rentType: this.date,
      standardRoom: 'vip',
      descriptionOtherConvenience: 'Có hồ bơi',
      poolArea: 500,
      numberOfFloors: 4,
      facilityFree: '',

    },
    {
      image: "https://gaxa.vn/wp-content/uploads/2022/06/modern-house-2-tang-doc-dao.jpg",
      id: 2,
      name: 'House Princess 01',
      area: 14000,
      cost: 5000000,
      maxPeople: 7,
      facilityType: this.house,
      rentType: this.month,
      standardRoom: 'vip',
      descriptionOtherConvenience: 'Có thêm bếp',
      poolArea: 0,
      numberOfFloors: 3,
      facilityFree: '',
    },
    {
      image: "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
      id: 3,
      name: 'Room Princess 03',
      area: 2000,
      cost: 50000,
      maxPeople: 3,
      facilityType: this.room,
      rentType: this.month,
      standardRoom: 'vip',
      descriptionOtherConvenience: 'Có thêm bếp',
      poolArea: 0,
      numberOfFloors: 3,
      facilityFree: '',
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
