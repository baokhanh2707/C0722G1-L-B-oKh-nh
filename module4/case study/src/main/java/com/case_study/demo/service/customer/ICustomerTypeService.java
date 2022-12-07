package com.case_study.demo.service.customer;


import com.case_study.demo.model.customer.CustomerType;

import java.util.List;

public interface ICustomerTypeService {
    List<CustomerType> findAll();
}
