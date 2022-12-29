import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // @ts-ignore
  products: Product[] = [{
    id: 1,
    name: 'IPhone 12',
    price: 2400000,
    description: 'New'
  }, {
    id: 2,
    name: 'IPhone 11',
    price: 1560000,
    description: 'Like new'
  }, {
    id: 3,
    name: 'IPhone X',
    price: 968000,
    description: '97%'
  }, {
    id: 4,
    name: 'IPhone 8',
    price: 7540000,
    description: '98%'
  }, {
    id: 5,
    name: 'IPhone 11 Pro',
    price: 1895000,
    description: 'Like new'
  }];

  // tslint:disable-next-line:typedef
  constructor() {
  }

  // tslint:disable-next-line:typedef
  getAll() {
    return this.products;
  }

  // tslint:disable-next-line:typedef
  saveProduct(product: Product) {
    this.products.push(product);
  }

  // tslint:disable-next-line:variable-name
  findById(number: number): Product | null {
    // tslint:disable-next-line:no-shadowed-variable
    const temp = this.products.filter(element => element.id === number);
    if (temp.length === 0) {
      return null;
    }
    return temp[0];
  }

  // tslint:disable-next-line:typedef
  update(id: number, product: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = product;
      }
    }
  }

  // tslint:disable-next-line:typedef
  deleteById(id: number| undefined) {
    if ( id !== undefined){
      const product = this.findById(id);
      if ( product != null){
        const length1 = this.products.length;
        for (let i = 0; i < length1 ; i++) {
          console.log(this.products[i].id);
          if (product.id === this.products[i].id){
            this.products.splice(i, 1);
            break;
          }
        }
      }
    }
  }
}
