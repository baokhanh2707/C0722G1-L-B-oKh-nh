package com.case_study.demo.service.facility.impl;

import com.case_study.demo.model.facility.Facility;
import com.case_study.demo.repository.facility.IFacilityRepository;
import com.case_study.demo.service.facility.IFacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class FacilityService implements IFacilityService {
    @Autowired
    private IFacilityRepository iFacilityRepository;
    @Override
    public Facility save(Facility facility) {
        return iFacilityRepository.save(facility);
    }

    @Override
    public Page<Facility> searchByName(String name, Pageable pageable) {
        return iFacilityRepository.searchByName(name,pageable);
    }

    @Override
    public Optional<Facility> findById(Long id) {
        return iFacilityRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        iFacilityRepository.deleteById(id);
    }
}
