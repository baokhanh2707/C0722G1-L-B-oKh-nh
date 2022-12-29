import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
    // @ts-ignore
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        // tslint:disable-next-line:radix
        this.product = this.productService.findById(parseInt(id));
        this.productForm = new FormGroup({
          // @ts-ignore
          id: new FormControl(this.product.id),
          // @ts-ignore
          name: new FormControl(this.product.name),
          // @ts-ignore
          price: new FormControl(this.product.price),
          // @ts-ignore
          description: new FormControl(this.product.description),
        });
      }
    });
  }

  product?: Product | null;
  productForm: FormGroup = new FormGroup({});

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  updateProduct(id: any) {
    // @ts-ignore
    const product = this.productForm.value;
    this.productService.update(id, product);
    alert('cập nhập thành công');
  }
}
