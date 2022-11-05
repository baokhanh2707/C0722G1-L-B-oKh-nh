package service.impl;

import model.Product;
import repository.IProductRepository;
import repository.impl.ProductRepository;
import service.IProductService;

import java.util.List;

public class ProductService implements IProductService {
    private IProductRepository productRepository =new ProductRepository();
    @Override
    public List<Product> finAll() {
        return productRepository.findAll();
    }

    @Override
    public void add(Product product) {
productRepository.add(product);
    }

    @Override
    public void edit(int idProduct, Product product) {
        productRepository.edit(idProduct,product);

    }

    @Override
    public Product findById(int idProduct) {
        return  productRepository.findById(idProduct);

    }

    @Override
    public void delete(int idProduct) {
        productRepository.delete(idProduct);
    }

}
