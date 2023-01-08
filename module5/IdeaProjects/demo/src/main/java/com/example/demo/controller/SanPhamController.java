package com.example.demo.controller;

import com.example.demo.model.SanPham;
import com.example.demo.service.impl.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("san-pham")
@CrossOrigin("*")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;
    @GetMapping
    public ResponseEntity<SanPham> getList() {
        List<SanPham> sanPhamList = sanPhamService.finAll();
        if (sanPhamList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>( HttpStatus.OK);
    }
}
