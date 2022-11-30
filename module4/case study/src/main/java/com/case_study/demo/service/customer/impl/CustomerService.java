package com.case_study.demo.service.customer.impl;

import com.case_study.demo.model.Customer;
import com.case_study.demo.repository.customer.ICustomerRepository;
import com.case_study.demo.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;
    @Override
    public Page<Customer> findAll(Pageable pageable) {
        return iCustomerRepository.findAll(pageable);
    }

    @Override
    public Customer save(Customer customer) {
        return iCustomerRepository.save(customer);
    }

    @Override
    public Page<Customer> searchByName(String name, Pageable pageable) {
        return iCustomerRepository.searchByName(name,pageable);
    }
}
