package com.case_study.demo.service.customer;


import com.case_study.demo.model.CustomerType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICustomerTypeService {
    List<CustomerType> findAll();
}
