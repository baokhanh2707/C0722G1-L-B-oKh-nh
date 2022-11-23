package com.products.service;

import com.products.model.Products;

import java.util.List;

public interface IProductsService {
    List<Products>findAll();
    void add(Products products);
    void update(int idProducts, Products products);
    Products findById(int idProducts);
    void delete(int idProducts);
    List<Products> search(String nameProducts);
}
