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

  delete() {
    // @ts-ignore
    const id = this.product.id;
    this.productService.deleteProduct(id).subscribe(data => {
      document.getElementById('exampleModal')?.click();
      alert('xoá thành công');
      window.location.reload();
    }, error => {
    }, () => {
    });
  }
}
