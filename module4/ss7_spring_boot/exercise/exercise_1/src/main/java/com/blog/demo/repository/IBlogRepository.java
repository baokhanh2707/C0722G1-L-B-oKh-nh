package com.blog.demo.repository;

import com.blog.demo.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IBlogRepository extends JpaRepository<Blog, Integer> {
   Page<Blog> findByCategory_Id(Pageable pageable, int id);

Page<Blog> findByName(String name, Pageable pageable);
@Query(value = "select * from blog b where b.name like concat('%',:name,'%') order by b.name",
        countQuery ="select * from blog b where b.name like concat('%',:name,'%') order by b.name"
        ,nativeQuery = true)
Page<Blog> searchByName(@Param("name") String name, Pageable pageable);

}
