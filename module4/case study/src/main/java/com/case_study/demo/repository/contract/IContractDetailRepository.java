package com.case_study.demo.repository.contract;

import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.ContractDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IContractDetailRepository extends JpaRepository<ContractDetail,Long> {

}
