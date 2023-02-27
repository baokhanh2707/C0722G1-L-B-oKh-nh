package com.be.controller;

import com.be.model.Laptop;
import com.be.service.ILapTopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api-laptop")
@CrossOrigin("*")
public class LaptopController {
    @Autowired
    private ILapTopService lapTopService;

    @GetMapping("")
    public ResponseEntity<Page<Laptop>> getAllLaptop(@PageableDefault(size = 3) Pageable pageable) {
        Page<Laptop> laptopPage;
        laptopPage = lapTopService.getAllLaptop(pageable);
        return new ResponseEntity<>(laptopPage, HttpStatus.OK);
    }

}
