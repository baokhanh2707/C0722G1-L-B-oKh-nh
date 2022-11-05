package service;

import model.Product;
        import java.util.List;

public interface IProductService {
    List<Product> finAll();

    void add(Product product);

    void edit(int idProduct, Product product);

    Product findById(int idProduct);
    void delete(int idProduct);

}
