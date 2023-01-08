package com.example.demo.service.impl;

import com.example.demo.model.LoHang;
import com.example.demo.repository.ILoHangRepository;
import com.example.demo.service.ILoHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoHangService implements ILoHangService {
    @Autowired
    private ILoHangRepository iLoHangRepository;

    @Override
    public Page<LoHang> findAll(Pageable pageable) {
        return iLoHangRepository.findAll(pageable);
    }

    @Override
    public Optional<LoHang> findByTd(Long id) {
        return iLoHangRepository.findById(id);
    }

    @Override
    public void save(LoHang loHang) {
        iLoHangRepository.save(loHang);
    }

    @Override
    public void remove(Long id) {
        iLoHangRepository.deleteById(id);
    }
}
