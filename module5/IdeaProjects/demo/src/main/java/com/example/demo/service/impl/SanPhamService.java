package com.example.demo.service.impl;

import com.example.demo.model.SanPham;
import com.example.demo.repository.ISanPhamRepository;
import com.example.demo.service.ISanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SanPhamService implements ISanPhamService {
    @Autowired
    private ISanPhamRepository iSanPhamRepository;
    @Override
    public List<SanPham> finAll() {
        return iSanPhamRepository.findAll();
    }
}
