package com.example.baitap.service.impl;

import com.example.baitap.model.Phim;
import com.example.baitap.repository.IPhimRepository;
import com.example.baitap.service.IPhimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PhimService implements IPhimService {
    @Autowired
    private IPhimRepository iPhimRepository;
    @Override
    public List<Phim> finAll() {
        return iPhimRepository.findAll();
    }
}
