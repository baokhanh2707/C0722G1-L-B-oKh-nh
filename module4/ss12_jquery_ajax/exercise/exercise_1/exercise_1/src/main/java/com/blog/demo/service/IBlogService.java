package com.blog.demo.service;

import com.blog.demo.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IBlogService {
    Page<Blog> findAll(Pageable pageable);

    Blog save(Blog blog);

    Optional<Blog> findById(Integer id);

    void delete(Blog blog);

//    Page<Blog> searchByName(String name, Pageable pageable);

    Page<Blog> findBlogByNameContaining(Pageable pageable, String name);

    //    Page<Blog>search(Pageable pageable ,int id);
}
