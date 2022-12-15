package com.case_study.demo.service.contract;

import com.case_study.demo.model.contract.AttachFacility;

import java.util.List;
import java.util.Optional;

public interface IAttachFacilityService {
    AttachFacility save(AttachFacility attachFacility);
    Optional<AttachFacility> findById(Long id);
    List<AttachFacility>finAll();
}
