package com.case_study.demo.repository.contract;

import com.case_study.demo.dto.ContractDetailDto;
import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.ContractDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IContractDetailRepository extends JpaRepository<ContractDetail,Long> {
//    @Query(value = "select con.id as contractId , a.name as attachFacilityName, a.status,a.unit,cd.quantity from contract as con join contract_detail cd on con.id = cd.contract_id join attach_facility a on cd.attach_facility_id = a.id where contract_id=:id"
//            ,countQuery="select con.id as contractId , a.name as attachFacilityName, a.status,a.unit,cd.quantity from contract as con join contract_detail cd on con.id = cd.contract_id join attach_facility a on cd.attach_facility_id = a.id where contract_id=:id",
//            nativeQuery = true)
//    List<ContractDetail> ContractDetails(@Param("id") Long id);
        @Query(value = "select attach_facility.name as name,contract_detail.contract_id,  " +
                "attach_facility.unit as unit, sum(ifnull(contract_detail.quantity, 0)) as quantity, " +
                "attach_facility.cost as cost " +
                "from contract_detail join attach_facility " +
                "on contract_detail.attach_facility_id = attach_facility.id " +
                "where contract_detail.contract_id = :id group by attach_facility.id;"
                ,countQuery="select attach_facility.name as name,contract_detail.contract_id, " +
                "            attach_facility.unit as unit, sum(ifnull(contract_detail.quantity, 0)) as quantity," +
                "            attach_facility.cost as cost " +
                "            from contract_detail join attach_facility " +
                "            on contract_detail.attach_facility_id = attach_facility.id " +
                "            where contract_detail.contract_id = :id group by attach_facility.id;",
                nativeQuery = true)
        List<ContractDetailDto> ContractDetails(@Param("id") Long id);

}
