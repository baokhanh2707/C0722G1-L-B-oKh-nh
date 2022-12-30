import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product | null = {};

  productForm: FormGroup = new FormGroup({});
  private id: number | undefined;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      if (this.id != null) {
        this.getProduct(this.id);
      }
    }, error => {
    }, () => {

    });
  }

  compareCate(item1: Category, item2: Category): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  // tslint:disable-next-line:typedef
  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this.productForm = new FormGroup({
        id: new FormControl(product.id),
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
      });
      this.categoryService.getAll().subscribe(data => {
        this.categories = data;
      }, error => {
      }, () => {
      });
    });
  }

  ngOnInit(): void {
  }

  updateProduct() {
    const productEdit = this.productForm.value;
    this.productService.updateProduct(this.id, productEdit).subscribe(data => {
      alert('Sửa thành công');
    }, (error: any) => {
      console.log(error);
    }, () => {
      this.router.navigateByUrl('product/list');
    });
  }
}
