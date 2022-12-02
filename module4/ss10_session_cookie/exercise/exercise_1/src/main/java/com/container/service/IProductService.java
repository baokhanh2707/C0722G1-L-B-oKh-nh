package com.container.service;

import com.container.model.Product;

import java.util.Optional;

public interface IProductService {
    Iterable<Product> findAll();

    Optional<Product> findById(Long id);
}
