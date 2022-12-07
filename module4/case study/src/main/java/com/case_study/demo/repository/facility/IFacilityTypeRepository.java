package com.case_study.demo.repository.facility;

import com.case_study.demo.model.facility.FacilityType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFacilityTypeRepository extends JpaRepository<FacilityType,Long> {
}
