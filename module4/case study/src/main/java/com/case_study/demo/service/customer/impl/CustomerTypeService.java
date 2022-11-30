package com.case_study.demo.service.customer.impl;

import com.case_study.demo.model.CustomerType;
import com.case_study.demo.repository.customer.ICustomerTypeRepository;
import com.case_study.demo.service.customer.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class CustomerTypeService implements ICustomerTypeService {
@Autowired
private ICustomerTypeRepository iCustomerTypeRepository;
    @Override
    public List<CustomerType> findAll() {
        return iCustomerTypeRepository.findAll();
    }
}
