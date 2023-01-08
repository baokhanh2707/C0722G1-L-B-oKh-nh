import {Component, OnInit} from '@angular/core';
import {SanPham} from '../san-pham';
import {LoHang} from '../lo-hang';
import {ThiService} from './thi.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  sanPhams: SanPham[] = [];
  loHangs: LoHang[] = [];
  temp: any;
  constructor(private thiService: ThiService) {
    this.thiService.getSanPham().subscribe(data => {
      this.sanPhams = data;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.thiService.getAll().subscribe(data => {
      console.log(data);
      this.loHangs = data;
    });
  }

  reload(): void {
    this.getAll();
  }
}
