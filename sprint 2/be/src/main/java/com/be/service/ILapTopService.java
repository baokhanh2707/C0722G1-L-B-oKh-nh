package com.be.service;

import com.be.model.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface ILapTopService {
    Page<Laptop> getAllLaptop(Pageable pageable);
    Page<Laptop> getAllLaptopAndSearch(@Param("nameSearch") String nameSearch,Pageable pageable);
}
