package com.example.demo.service;

import com.example.demo.model.LoHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ILoHangService {
    Page<LoHang> findAll(Pageable pageable);
    Optional<LoHang> findByTd(Long id);
    void save(LoHang loHang);
    void remove(Long id);
}
