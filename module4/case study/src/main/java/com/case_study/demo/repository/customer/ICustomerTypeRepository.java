package com.case_study.demo.repository.customer;

import com.case_study.demo.model.customer.CustomerType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerTypeRepository extends JpaRepository<CustomerType,Integer> {
}
