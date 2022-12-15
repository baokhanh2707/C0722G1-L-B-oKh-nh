package com.case_study.demo.service.contract.impl;

import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.repository.contract.IAttachFacilityRepository;
import com.case_study.demo.service.contract.IAttachFacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttachFacilityService implements IAttachFacilityService {
    @Autowired
    private IAttachFacilityRepository iAttachFacilityRepository;
    @Override
    public AttachFacility save(AttachFacility attachFacility) {
        return iAttachFacilityRepository.save(attachFacility);
    }

    @Override
    public Optional<AttachFacility> findById(Long id) {
        return iAttachFacilityRepository.findById(id);
    }

    @Override
    public List<AttachFacility> finAll() {
        return iAttachFacilityRepository.findAll();
    }
}
