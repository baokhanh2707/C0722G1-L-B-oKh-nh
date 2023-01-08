package com.example.demo.service.impl;

import com.example.demo.model.LoHang;
import com.example.demo.repository.ILoHangRepository;
import com.example.demo.service.ILoHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoHangService implements ILoHangService {
    @Autowired
    private ILoHangRepository iLoHangRepository;

    @Override
    public void save(LoHang loHang) {
        iLoHangRepository.save(loHang);
    }

    @Override
    public void update(LoHang loHang) {
        iLoHangRepository.save(loHang);
    }

    @Override
    public List<LoHang> getAll() {
        return iLoHangRepository.getAllLoHang();
    }

    @Override
    public LoHang finById(Long id) {
        return iLoHangRepository.findByIdLoHang(id);
    }

    @Override
    public void remove(Long id) {
        iLoHangRepository.deleteById(id);
    }
}
