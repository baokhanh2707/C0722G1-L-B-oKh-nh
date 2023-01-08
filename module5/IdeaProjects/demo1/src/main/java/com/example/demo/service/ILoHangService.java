package com.example.demo.service;

import com.example.demo.model.LoHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ILoHangService {
    void save(LoHang loHang);

    void update(LoHang loHang);

    List<LoHang> getAll();

    LoHang finById(Long id);

    void remove(Long id);
}
