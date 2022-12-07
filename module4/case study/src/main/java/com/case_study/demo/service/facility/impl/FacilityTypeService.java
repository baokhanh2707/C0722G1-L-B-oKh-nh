package com.case_study.demo.service.facility.impl;

import com.case_study.demo.model.facility.FacilityType;
import com.case_study.demo.repository.facility.IFacilityTypeRepository;
import com.case_study.demo.service.facility.IFacilityTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FacilityTypeService implements IFacilityTypeService {
    @Autowired
    private IFacilityTypeRepository iFacilityTypeRepository;
    @Override
    public List<FacilityType> finAll() {
        return iFacilityTypeRepository.findAll();
    }
}
