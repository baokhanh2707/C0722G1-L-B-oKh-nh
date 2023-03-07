package com.be.service.impl;

import com.be.model.Laptop;
import com.be.repository.product.ILapTopRepository;
import com.be.service.ILapTopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LaptopService implements ILapTopService {
    @Autowired
    private ILapTopRepository lapTopRepository;
    @Override
    public Page<Laptop> getAllLaptop(Pageable pageable) {
        return lapTopRepository.getAllLaptop(pageable);
    }

    @Override
    public Page<Laptop> getAllLaptopAndSearch( String nameSearch,Pageable pageable) {
        return lapTopRepository.getAllLaptopAndSearch(nameSearch,pageable);
    }
}
