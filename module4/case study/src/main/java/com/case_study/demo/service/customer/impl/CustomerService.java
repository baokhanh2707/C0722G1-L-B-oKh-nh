package com.case_study.demo.service.customer.impl;

import com.case_study.demo.model.customer.Customer;
import com.case_study.demo.repository.customer.ICustomerRepository;
import com.case_study.demo.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;
    @Override
    public Customer save(Customer customer) {
        return iCustomerRepository.save(customer);
    }

    @Override
    public Page<Customer> searchByName(String name,String email,String customerType, Pageable pageable) {
        return iCustomerRepository.searchByName(name,email,customerType,pageable);
    }

    @Override
    public Optional<Customer> findById(Integer id) {
        return iCustomerRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
       iCustomerRepository.deleteById(id);
    }
}
