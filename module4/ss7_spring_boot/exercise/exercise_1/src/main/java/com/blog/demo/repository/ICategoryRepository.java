package com.blog.demo.repository;

import com.blog.demo.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
public interface ICategoryRepository extends JpaRepository<Category,Integer> {
}
