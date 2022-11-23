package com.products.reponsitory.impl;

import com.products.model.Products;
import com.products.reponsitory.IProductsRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProductsRepository implements IProductsRepository {
    private static final Map<Integer, Products> productsList;

    static {
        productsList = new HashMap<>();
        productsList.put(1, new Products(1, "cam", 3000, "cam sành", "mỹ"));
        productsList.put(2, new Products(2, "ổi", 3000, "ổi non ", "hàn"));
        productsList.put(3, new Products(3, "xoài", 3000, "xoài chín", "trung"));
    }

    @Override
    public List<Products> findAll() {
        return new ArrayList<>(productsList.values());
    }

    @Override
    public void add(Products products) {
        productsList.put(products.getId(), products);
    }

    @Override
    public void update(int idProducts, Products products) {
        productsList.put(products.getId(), products);
    }

    @Override
    public Products findById(int idProducts) {
        return productsList.get(idProducts);
    }

    @Override
    public void delete(int idProducts) {
        productsList.remove(idProducts);
    }

    @Override
    public List<Products> search(String nameProducts) {
        List<Products> productsMap = new ArrayList<>();
        for (Products products : productsList.values()) {
            if (products.getName().contains(nameProducts)) {
                productsMap.add(products);
            }
        }
        return productsMap;
    }
}
