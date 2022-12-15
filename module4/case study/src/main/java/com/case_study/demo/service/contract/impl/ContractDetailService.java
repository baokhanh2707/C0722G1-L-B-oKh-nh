package com.case_study.demo.service.contract.impl;

import com.case_study.demo.dto.ContractDetailDto;
import com.case_study.demo.model.contract.ContractDetail;
import com.case_study.demo.repository.contract.IContractDetailRepository;
import com.case_study.demo.repository.contract.IContractRepository;
import com.case_study.demo.service.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ContractDetailService implements IContractDetailService {
    @Autowired
    private IContractDetailRepository iContractDetailRepository;
    @Override
    public List<ContractDetail> finAll() {
        return iContractDetailRepository.findAll();
    }

    @Override
    public ContractDetail save(ContractDetail contractDetail) {
        return iContractDetailRepository.save(contractDetail);
    }

    @Override
    public List<ContractDetailDto> ContractDetails(Long id) {
        return iContractDetailRepository.ContractDetails(id);
    }
}
