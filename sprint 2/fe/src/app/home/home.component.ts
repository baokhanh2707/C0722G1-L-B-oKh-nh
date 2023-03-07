import {Component, OnInit} from '@angular/core';
import {HomeService} from "../service/home/home.service";
import {Product} from "../entity/product/product";
import {HomeJson} from "../entity/product/home-json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePage: Product[] = [];
  homeJson!: HomeJson
  page = 0

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeList()
  }

  homeList(): void {
    this.homeService.getHomeList(this.page).subscribe(data => {
      if (data !== null) {
        this.homeJson = data;
      }
    })
  }
  gotoPage(pageNumber: number): void {
    this.page = pageNumber;
    this.ngOnInit();
  }
}
