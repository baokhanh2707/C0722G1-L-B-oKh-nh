package com.case_study.demo.service.employee.impl;

import com.case_study.demo.model.employee.Employee;
import com.case_study.demo.repository.employee.IEmployeeRepository;
import com.case_study.demo.service.employee.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService  implements IEmployeeService {
    @Autowired
    IEmployeeRepository employeeRepository;
    @Override
    public List<Employee> finAll() {
        return employeeRepository.findAll();
    }
}
