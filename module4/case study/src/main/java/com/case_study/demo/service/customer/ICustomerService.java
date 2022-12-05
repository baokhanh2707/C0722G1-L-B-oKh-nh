package com.case_study.demo.service.customer;

import com.case_study.demo.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ICustomerService {
    Customer save(Customer customer);
    Page<Customer>searchByName(String name,Pageable pageable);
    Optional<Customer>findById(Integer id);
    void delete(Integer id);
}
