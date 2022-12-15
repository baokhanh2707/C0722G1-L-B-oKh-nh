package com.case_study.demo.service.contract;

import com.case_study.demo.dto.ContractDetailDto;
import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.ContractDetail;

import java.util.List;
import java.util.Optional;

public interface IContractDetailService {
    List<ContractDetail>finAll();
    ContractDetail save(ContractDetail contractDetail);
    List<ContractDetailDto>ContractDetails(Long id);

}
