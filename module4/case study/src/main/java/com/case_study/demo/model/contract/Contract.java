package com.case_study.demo.model.contract;

import com.case_study.demo.model.customer.Customer;
import com.case_study.demo.model.employee.Employee;
import com.case_study.demo.model.facility.Facility;

import javax.persistence.*;

@Entity
    public class Contract {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(columnDefinition = "date")
        private String startDate;

        @Column(columnDefinition = "date")
        private String endDate;

        private double deposit;

        @ManyToOne
        @JoinColumn(name = "customer_id",referencedColumnName = "id")
        private Customer customer;

        @ManyToOne
        @JoinColumn(name = "employee_id",referencedColumnName = "id")
        private Employee employee;

        @ManyToOne
        @JoinColumn(name = "facility_id",referencedColumnName = "id")
        private Facility facility;

    public Contract() {
    }

    public Contract(Long id, String startDate, String endDate, double deposit, Customer customer, Employee employee, Facility facility) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.deposit = deposit;
        this.customer = customer;
        this.employee = employee;
        this.facility = facility;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(double deposit) {
        this.deposit = deposit;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }
}
