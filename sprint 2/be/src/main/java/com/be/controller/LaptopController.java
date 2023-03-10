package com.be.controller;

import com.be.model.Laptop;
import com.be.service.ILapTopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/public")
@CrossOrigin("*")
public class LaptopController {
    @Autowired
    private ILapTopService lapTopService;

    @GetMapping("/list")
    public ResponseEntity<Page<Laptop>> getAllLaptop(@PageableDefault(size = 6) Pageable pageable, @RequestParam(defaultValue = "") String search) {
        Page<Laptop> laptopPage;
        laptopPage = lapTopService.getAllLaptopAndSearch(search, pageable);
        return new ResponseEntity<>(laptopPage, HttpStatus.OK);
    }
    @GetMapping("/detail")
    public ResponseEntity<Laptop> findIdLapTop(@RequestParam Long id) {
        Laptop laptops = lapTopService.findByIdLaptop(id);
        if (laptops.getId() == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(laptops, HttpStatus.OK);
    }

    @GetMapping("/related")
    public ResponseEntity<List<Laptop>>findIdType(@RequestParam Long id){
        List<Laptop>laptops=lapTopService.getLapByIdProduct(id);
        if (laptops.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(laptops, HttpStatus.OK);
    }
}
