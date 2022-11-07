package repository;

import model.Product;

import java.util.List;

public interface IProductRepository {
    List<Product>findAll();
void add(Product product);
void edit(int idProduct, Product product);
Product findById(int idProduct);
void delete(int idProduct);
List<Product> search(String nameProduct);

}
