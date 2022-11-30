package com.case_study.demo.service.customer;

import com.case_study.demo.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICustomerService {
    Page<Customer>findAll(Pageable pageable);
    Customer save(Customer customer);
    Page<Customer>searchByName(String name,Pageable pageable);

}
