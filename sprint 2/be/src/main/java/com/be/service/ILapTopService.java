package com.be.service;

import com.be.model.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ILapTopService {
    Page<Laptop> getAllLaptop(Pageable pageable);
}
