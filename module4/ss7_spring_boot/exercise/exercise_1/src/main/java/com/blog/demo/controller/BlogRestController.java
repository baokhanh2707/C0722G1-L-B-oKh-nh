package com.blog.demo.controller;

import com.blog.demo.model.Blog;
import com.blog.demo.service.IBlogService;
import com.blog.demo.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
@RequestMapping("/blogRest")
@Controller
public class BlogRestController {
    @Autowired
    private IBlogService iBlogService;
    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Blog>> view(@PathVariable("id") Integer id){
        Optional<Blog> blog = iBlogService.findById(id);
        return new ResponseEntity<>(blog,HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Page<Blog>> getList( @PageableDefault(page = 0,size = 3) Pageable pageable){
        Page<Blog>blogList =iBlogService.findAll(pageable);
        if(blogList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(blogList,HttpStatus.OK);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<Page<Blog>> search(@PathVariable("id") int id ,@PageableDefault(page = 0,size = 3) Pageable pageable){
        Page<Blog>blogList =iBlogService.search(pageable,id);
        if(blogList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(blogList,HttpStatus.OK);
    }

}
