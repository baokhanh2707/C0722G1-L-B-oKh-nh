import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  temp: Product = {};

  constructor(private productService: ProductService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAll();
  }

  // tslint:disable-next-line:typedef
  getAll() {
    this.products = this.productService.getAll();
  }
}
