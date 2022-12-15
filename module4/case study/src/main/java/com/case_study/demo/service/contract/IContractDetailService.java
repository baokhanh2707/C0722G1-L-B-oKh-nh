package com.case_study.demo.service.contract;

import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.ContractDetail;

import java.util.List;

public interface IContractDetailService {
    List<ContractDetail>finAll();
    ContractDetail save(ContractDetail contractDetail);

}
