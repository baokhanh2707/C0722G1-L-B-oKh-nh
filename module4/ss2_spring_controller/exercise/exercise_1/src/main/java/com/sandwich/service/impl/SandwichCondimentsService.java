package com.sandwich.service.impl;

import com.sandwich.repository.ISandwichCondimentsRepository;
import com.sandwich.service.ISandwichCondimentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SandwichCondimentsService implements ISandwichCondimentsService {
    @Autowired
    ISandwichCondimentsRepository iSandwichCondimentsRepository;

    @Override
    public List<String> list(String lettuce, String tomato, String mustard, String sprouts) {
        return iSandwichCondimentsRepository.list(lettuce, tomato, mustard, sprouts);
    }
}
