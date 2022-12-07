package com.case_study.demo.service.facility.impl;

import com.case_study.demo.model.facility.RentType;
import com.case_study.demo.repository.facility.IRentTypeRepository;
import com.case_study.demo.service.facility.IRentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RentTypeService implements IRentTypeService {
    @Autowired
    private IRentTypeRepository iRentTypeRepository;
    @Override
    public List<RentType> finAll() {
        return iRentTypeRepository.findAll() ;
    }
}
