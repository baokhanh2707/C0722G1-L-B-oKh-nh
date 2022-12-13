package com.case_study.demo.service.facility;

import com.case_study.demo.model.facility.Facility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IFacilityService {
    Facility save(Facility facility);
    Page<Facility> search(String name,String facilityType, Pageable pageable);
    Optional<Facility> findById(Long id);
    void delete(Long id);
    List<Facility>finAll();
}
