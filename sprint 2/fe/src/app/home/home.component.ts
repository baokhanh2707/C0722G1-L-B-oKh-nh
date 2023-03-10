import {Component, OnInit} from '@angular/core';
import {HomeService} from "../service/home/home.service";
import {Product} from "../entity/product/product";
import {HomeJson} from "../entity/product/home-json";
import {BehaviorServiceService} from "../service/BehaviorService/behavior-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePage: Product[] = [];
  homeJson!: HomeJson
  page = 0;
  search = '';

  constructor(private homeService: HomeService,
              private behaviorService: BehaviorServiceService) {
  }

  ngOnInit(): void {
    this.homeList(this.page,this.search);
   this.getValueHeader()
  }

  gotoPage(pageNumber: number): void {
    this.page = pageNumber;
    this.ngOnInit();
  }
  private getValueHeader() {
    this.behaviorService.getSearch().subscribe(data => {
      this.search = data;
      this.homeList(this.page,this.search);
    });
  }


  private homeList(page: number, search: string) {
    this.homeService.getHomeList(this.page,this.search).subscribe(data => {
          if (data !== null) {
            this.homeJson = data;
            console.log(data)
          }
        })
  }
}
