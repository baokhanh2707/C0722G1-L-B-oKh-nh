package com.products.reponsitory;

import com.products.model.Products;

import java.util.List;

public interface IProductsRepository {
    List<Products> findAll();

    void add(Products products);

    void update(Products products);

    Products findById(int idProducts);

    void delete(Products products);

    List<Products> search(String nameProducts);
}
