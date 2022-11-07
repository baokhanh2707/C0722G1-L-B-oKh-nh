package repository.impl;

import model.Product;
import repository.IProductRepository;

import java.util.ArrayList;
import java.util.List;

public class ProductRepository implements IProductRepository {
    private static List<Product> productList = new ArrayList<>();

    static {
        productList.add(new Product(1, 1, "táo", 20000));
        productList.add(new Product(2, 2, "cam", 30000));
        productList.add(new Product(3, 3, "xoài", 40000));
        productList.add(new Product(4, 4, "cam", 50000));

    }

    @Override
    public List<Product> findAll() {
        return productList;
    }

    @Override
    public void add(Product product) {
        productList.add(product);
    }

    @Override
    public void edit(int idProduct, Product product) {
        for (int i = 0; i < productList.size(); i++) {
            if (productList.get(i).getIdProduct() == idProduct) {
                productList.set(i, product);
            }
        }
    }

    @Override
    public Product findById(int idProduct) {
        for (int i = 0; i < productList.size(); i++) {
            if (productList.get(i).getIdProduct() == idProduct) {
                return productList.get(i);
            }
        }
        return null;
    }

    @Override
    public void delete(int idProduct) {
        for (int i = 0; i < productList.size(); i++) {
            if (productList.get(i).getIdProduct() == idProduct) {
                productList.remove(productList.get(i));
            }
        }
    }

    @Override
    public List<Product> search(String nameProduct) {
        List<Product> productList= findAll();
        List<Product> findProductList = new ArrayList<>();
        for (int i = 0; i < productList.size(); i++) {
            if (productList.get(i).getNameProduct().contains(nameProduct)) {
                findProductList.add(productList.get(i));
            }
        }
        return findProductList;
    }
}