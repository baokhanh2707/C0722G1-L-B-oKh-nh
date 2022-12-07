package com.case_study.demo.repository.facility;

import com.case_study.demo.model.facility.RentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRentTypeRepository extends JpaRepository<RentType,Long> {
}
