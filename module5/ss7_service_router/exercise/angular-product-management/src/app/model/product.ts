import {Category} from './category';

export interface Product {
  category?: Category;
  id?: number;
  name?: string;
  price?: number;
  description?: string;
}
