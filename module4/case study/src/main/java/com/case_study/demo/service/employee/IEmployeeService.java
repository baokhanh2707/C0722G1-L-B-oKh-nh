package com.case_study.demo.service.employee;

import com.case_study.demo.model.employee.Employee;
import com.case_study.demo.model.facility.Facility;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IEmployeeService {
    List<Employee>finAll();
}
