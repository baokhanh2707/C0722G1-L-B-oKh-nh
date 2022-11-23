package com.products.reponsitory;

import com.products.model.Products;

import java.util.List;

public interface IProductsRepository {
    List<Products> findAll();
    void add(Products products);
    void update(int idProducts, Products products);
    Products findById(int idProducts);
    void delete(int idProducts);
    List<Products> search(String nameProducts);
}
