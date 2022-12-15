package com.case_study.demo.repository.contract;

import com.case_study.demo.dto.ContractView;
import com.case_study.demo.model.contract.Contract;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface IContractRepository extends JpaRepository<Contract,Long> {
    @Query(value = "select contract.id , facility.name as facilityName, customer.name as customerName ,contract.start_date as startDay, contract.end_date as endDay, contract.deposit ,IFNULL(facility.cost, 0) + SUM(IFNULL(attach_facility.cost, 0) * IFNULL(contract_detail.quantity, 0)) AS totalMoney from contract " +
            "left join employee on employee.id=contract.employee_id" +
            " left join customer on customer.id=contract.customer_id" +
            " left join facility on facility.id=contract.facility_id" +
            " left join contract_detail on contract_detail.contract_id=contract.id" +
            " left join attach_facility on contract_detail.attach_facility_id=attach_facility.id group by contract.id order by contract.id",
    countQuery="select * from (select contract.id , facility.name as facilityName, customer.name as customerName ,contract.start_date as startDay, contract.end_date as endDay, contract.deposit ,IFNULL(facility.cost, 0) + SUM(IFNULL(attach_facility.cost, 0) * IFNULL(contract_detail.quantity, 0)) AS totalMoney from contract" +
            " left join employee on employee.id=contract.employee_id" +
            " left join customer on customer.id=contract.customer_id" +
            " left join facility on facility.id=contract.facility_id" +
            " left join contract_detail on contract_detail.contract_id=contract.id" +
            " left join attach_facility on contract_detail.attach_facility_id=attach_facility.id group by contract.id order by contract.id) contractView ",
            nativeQuery=true
    )
    Page<ContractView> findAllContractView(Pageable pageable);

}

