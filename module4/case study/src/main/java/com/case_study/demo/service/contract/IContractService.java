package com.case_study.demo.service.contract;

import com.case_study.demo.dto.ContractView;
import com.case_study.demo.model.contract.Contract;
import com.case_study.demo.model.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IContractService {
    Page<ContractView> finAll(Pageable pageable);
    Contract save(Contract contract);

}
