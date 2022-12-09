package com.case_study.demo.service.contract.impl;

import com.case_study.demo.dto.ContractView;
import com.case_study.demo.model.contract.Contract;
import com.case_study.demo.repository.contract.IContractRepository;
import com.case_study.demo.service.contract.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ContractService implements IContractService {
    @Autowired
    private IContractRepository iContractRepository;
    @Override
    public Page<ContractView> finAll(Pageable pageable) {
        return iContractRepository.findAllContractView(pageable);
    }

    @Override
    public Contract save(Contract contract) {
        return iContractRepository.save(contract);
    }
}
