package com.blog.demo.service.impl;

import com.blog.demo.model.Blog;
import com.blog.demo.repository.IBlogRepository;
import com.blog.demo.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private IBlogRepository iBlogRepository;

    @Override
    public List<Blog> findAll() {
        return iBlogRepository.findAll();
    }

    @Override
    public Blog save(Blog blog) {
        return iBlogRepository.save(blog);
    }

    @Override
    public Optional<Blog> findById(Integer id) {
        return iBlogRepository.findById(id);
    }

    @Override
    public void delete(Blog blog) {
        iBlogRepository.delete(blog);
    }

}
