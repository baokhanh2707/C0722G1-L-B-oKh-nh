import {Component, OnInit} from '@angular/core';
import {HomeService} from "../service/home/home.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../entity/product/product";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
laptopList : Product ={};
laptopType : Product[] = [];
  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id')
      {
        this.homeService.detailLapTop(Number(id)).subscribe(data =>{
          console.log(data)
          this.laptopList=data
        })
      }
    })
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id')
      {
        this.homeService.getListTypeProduct(Number(id)).subscribe(data =>{
          this.laptopType=data
        })
      }
    })
  }


  ngOnInit(): void {
  }

}
