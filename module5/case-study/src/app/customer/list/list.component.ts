import { Component, OnInit } from '@angular/core';
import {CustomerType} from "../../model/customer/customerType";
import {Customer} from "../../model/customer/customer";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  diamond: CustomerType = {
    id:1,
    name:"Diamond"
  }
  platinium: CustomerType = {
    id:2,
    name:"Platinium"
  }
  gold: CustomerType = {
    id:3,
    name:"Gold"
  }
  silver:CustomerType = {
    id:4,
    name:"Silver"
  }
  member : CustomerType ={
    id:5,
    name:"Member"
  }

  customers : Customer[] = [
    {
      id:1,
      customerTypeId:this.member,
      name:"Nguyễn Thị Hào",
      dateOfBirth:"1970-11-07",
      idCard:"643431213",
      phoneNumber:"0945423362",
      gender:false,
      email:"thihao07@gmail.com",
      address:"23 Nguyễn Hoàng, Đà Nẵng",
    },
    {
      id:2,
      customerTypeId:this.gold,
      name:"Phạm Xuân Diệu",
      dateOfBirth:"1992-08-08",
      idCard:"865342123",
      phoneNumber:"0954333333",
      gender:true,
      email:"xuandieu92@gmail.com",
      address:"K77/22 Thái Phiên, Quảng Trị",
    },
    {
      id:3,
      customerTypeId:this.diamond,
      name:"Trương Định Nghệ",
      dateOfBirth:"1990-02-27",
      idCard:"488645199",
      phoneNumber:"0373213122",
      gender:true,
      email:"nghenhan2702@gmail.com",
      address:"K323/12 Ông Ích Khiêm, Vinh",
    },
    {
      id:4,
      customerTypeId:this.diamond,
      name:"Dương Văn Quan",
      dateOfBirth:"1981-07-08",
      idCard:"543432111",
      phoneNumber:"0490039241",
      gender:true,
      email:"duongquan@gmail.com",
      address:"K453/12 Lê Lợi, Đà Nẵng",
    },
    {
      id:5,
      customerTypeId:this.silver,
      name:"Hoàng Trần Nhi Nhi",
      dateOfBirth:"1995-12-09",
      idCard:"795453345",
      phoneNumber:"0312345678",
      gender:false,
      email:"nhinhi123@gmail.com",
      address:"224 Lý Thái Tổ, Gia Lai",
    },
    {
      id:6,
      customerTypeId:this.silver,
      name:"Tôn Nữ Mộc Châu",
      dateOfBirth:"2005-12-06",
      idCard:"732434215",
      phoneNumber:"0988888844",
      gender:false,
      email:"tonnuchau@gmail.com",
      address:"37 Yên Thế, Đà Nẵng",
    },
    {
      id:7,
      customerTypeId:this.diamond,
      name:"Nguyễn Mỹ Kim",
      dateOfBirth:"1984-04-08",
      idCard:"856453123",
      phoneNumber:"0912345698",
      gender:false,
      email:"kimcuong84@gmail.com",
      address:"K123/45 Lê Lợi, Hồ Chí Minh",
    },
    {
      id:8,
      customerTypeId:this.gold,
      name:"Nguyễn Thị Hào",
      dateOfBirth:"1999-04-08",
      idCard:"965656433",
      phoneNumber:"0763212345",
      gender:false,
      email:"haohao99@gmail.com",
      address:"55 Nguyễn Văn Linh, Kon Tum",
    },
    {
      id:9,
      customerTypeId:this.diamond,
      name:"Trần Đại Danh",
      dateOfBirth:"1994-07-01",
      idCard:"432341235",
      phoneNumber:"0643343433",
      gender:true,
      email:"danhhai99@gmail.com",
      address:"24 Lý Thường Kiệt, Quảng Ngãi",
    },
    {
      id:10,
      customerTypeId:this.gold,
      name:"Nguyễn Tâm Đắc",
      dateOfBirth:"1989-07-01",
      idCard:"344343432",
      phoneNumber:"0987654321",
      gender:true,
      email:"dactam@gmail.com",
      address:"22 Ngô Quyền, Đà Nẵng",
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
