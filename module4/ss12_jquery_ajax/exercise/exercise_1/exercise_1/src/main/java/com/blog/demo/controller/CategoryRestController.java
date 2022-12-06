package com.blog.demo.controller;

import com.blog.demo.model.Category;
import com.blog.demo.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
@Controller
@RequestMapping("/categoryRest")
public class CategoryRestController {
    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("")
    public ResponseEntity<List<Category>> getList(){
        List<Category>categoryList =iCategoryService.findAll();
        if(categoryList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categoryList,HttpStatus.OK);
    }
}
