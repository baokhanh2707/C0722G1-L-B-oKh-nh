import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  @Input()
  product: Product | undefined = {};

  // tslint:disable-next-line:typedef
  productForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  delete() {
    // @ts-ignore
    this.productService.deleteById(this.product.id);
  }
}
