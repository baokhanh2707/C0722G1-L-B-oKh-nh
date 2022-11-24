package com.products.service.impl;

import com.products.model.Products;
import com.products.reponsitory.IProductsRepository;
import com.products.service.IProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService implements IProductsService {
    @Autowired
    IProductsRepository iProductsRepository;

    @Override
    public List<Products> findAll() {

        return iProductsRepository.findAll();
    }

    @Override
    public void add(Products products) {
        iProductsRepository.add(products);
    }

    @Override
    public void update( Products products) {
        iProductsRepository.update( products);
    }

    @Override
    public Products findById(int idProducts) {
        return iProductsRepository.findById(idProducts);
    }


    @Override
    public void delete(Products products) {
        iProductsRepository.delete(products);
    }

    @Override
    public List<Products> search(String nameProducts) {
        return iProductsRepository.search( nameProducts );
    }
}
