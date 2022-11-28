package com.blog.demo.service.impl;

import com.blog.demo.model.Category;
import com.blog.demo.repository.ICategoryRepository;
import com.blog.demo.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository iCategoryRepository;

    @Override
    public List<Category> findAll() {
        return iCategoryRepository.findAll() ;
    }

    @Override
    public Category save(Category blog) {
        return iCategoryRepository.save(blog);
    }

    @Override
    public Optional<Category> findById(Integer id) {
        return iCategoryRepository.findById(id);
    }

    @Override
    public void delete(Category blog) {
        iCategoryRepository.delete(blog);
    }
}
