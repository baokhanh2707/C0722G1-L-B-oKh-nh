package com.blog.demo.repository;

import com.blog.demo.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IBlogRepository extends JpaRepository<Blog, Integer> {
}
