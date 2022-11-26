package com.blog.demo.service;

import com.blog.demo.model.Blog;

import java.util.List;
import java.util.Optional;

public interface IBlogService {
    List<Blog> findAll();

    Blog save(Blog blog);

    Optional<Blog> findById(Integer id);

    void delete(Blog blog);


}
