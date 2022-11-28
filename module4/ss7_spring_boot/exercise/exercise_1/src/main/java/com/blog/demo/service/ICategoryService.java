package com.blog.demo.service;


import com.blog.demo.model.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    List<Category> findAll();

    Category save(Category blog);

    Optional<Category> findById(Integer id);

    void delete(Category category);

}
