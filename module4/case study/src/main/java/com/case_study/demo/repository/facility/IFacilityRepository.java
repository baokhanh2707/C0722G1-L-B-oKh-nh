package com.case_study.demo.repository.facility;

import com.case_study.demo.model.customer.Customer;
import com.case_study.demo.model.facility.Facility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IFacilityRepository extends JpaRepository<Facility,Long> {
    @Query(value = "select * from facility c where c.name like concat('%',:name,'%')",
            countQuery ="select * from facility c where c.name like concat('%',:name,'%')"
            ,nativeQuery = true)
    Page<Facility> searchByName(@Param("name") String name, Pageable pageable);
}
