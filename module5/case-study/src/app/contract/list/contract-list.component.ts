import {Component, OnInit} from '@angular/core';
import {Facility} from "../../facility/facility";
import {Contract} from "../contract";
import {Customer} from "../../customer/customer";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  1: Customer = {
    id: 1,
    name: "Nguyễn thị Cẩm Vân"
  }

  2: Customer = {
    id: 2,
    name: "Phạm Xuân Diệu",
  }
  3: Customer = {
    id: 3
    ,
    name: "Trương Định Nghệ"
  }

  4: Customer = {
    id: 4,
    name: "Dương Văn Quan"
  }
  5: Customer = {
    id: 5,
    name: "Hoàng Trần Nhi Nhi"
  }
  6: Customer = {
    id: 6,
    name: "Tôn Nữ Mộc Châu",
  }
  7: Customer = {
    id: 7,
    name: "Nguyễn Mỹ Kim"
  }
  8: Customer = {
    id: 8,
    name: "Nguyễn Thị Hào"
  }
  9: Customer = {
    id: 9,
    name: "Trần Đại Danh"
  }
  10: Customer = {
    id: 10,
    name: "Nguyễn Tâm Đắc",
  }

  villaBeachFront: Facility = {
    id: 1,
    name: "Villa Beach Front",
  }
  housePrincess01: Facility = {
    id: 2,
    name: "House Princess 01",
  }
  roomTwin01: Facility = {
    id: 3,
    name: "Room Twin 01",
  }
  villaNoBeachFront: Facility = {
    id: 4,
    name: "Villa No Beach Front",
  }
  housePrincess02: Facility = {
    id: 5,
    name: "House Princess 02",
  }
  roomTwin02: Facility = {
    id: 6,
    name: "Room Twin 02",
  }
  contracts: Contract[] = [
    {
      id: 1,
      startDate: "2020-12-08",
      endDate: "2020-12-08",
      deposit: 0,
      customer: this["1"],
      facility: this.roomTwin01
    },
    {
      id: 2,
      startDate: "2020-07-14",
      endDate: "2020-07-21",
      deposit: 200000,
      customer: this["3"],
      facility: this.villaBeachFront
    },
    {
      id: 3,
      startDate: "2021-03-15",
      endDate: "2021-03-17",
      deposit: 50000,
      customer: this["4"],
      facility: this.housePrincess01
    },
    {
      id: 4,
      startDate: "2021-01-14",
      endDate: "2021-01-18",
      deposit: 100000,
      customer: this["5"],
      facility: this.housePrincess02
    },
    {
      id: 5,
      startDate: "2021-07-14",
      endDate: "2021-07-15",
      deposit: 0,
      customer: this["2"],
      facility: this.roomTwin02
    },
    {
      id: 6,
      startDate: "2021-06-01",
      endDate: "2021-06-03",
      deposit: 0,
      customer: this["7"],
      facility: this.roomTwin02
    },
    {
      id: 7,
      startDate: "2021-09-02",
      endDate: "2021-09-05",
      deposit: 100000,
      customer: this["4"],
      facility: this.roomTwin02
    },
    {
      id: 8,
      startDate: "2021-06-17",
      endDate: "2021-06-18",
      deposit: 150000,
      customer: this["4"],
      facility: this.villaBeachFront
    },
    {
      id: 9,
      startDate: "2020-11-19",
      endDate: "2020-11-19",
      deposit: 0,
      customer: this["4"],
      facility: this.roomTwin01
    },
    {
      id: 10,
      startDate: "2021-04-12",
      endDate: "2021-04-14",
      deposit: 0,
      customer: this["3"],
      facility: this.housePrincess02
    },
    {
      id: 11,
      startDate: "2021-04-25",
      endDate: "2021-04-25",
      deposit: 0,
      customer: this["2"],
      facility: this.villaBeachFront
    },
    {
      id: 12,
      startDate: "2021-05-25",
      endDate: "2021-05-27",
      deposit: 0,
      customer: this["10"],
      facility: this.villaBeachFront
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
