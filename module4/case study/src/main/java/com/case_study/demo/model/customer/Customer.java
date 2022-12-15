package com.case_study.demo.model.customer;

import com.case_study.demo.model.contract.Contract;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String dateOfBirth;
    private String gender;
    private String idCard;
    private String phoneNumber;
    private String email;
    private String address;
    @Column(columnDefinition = "bit default false")
    private boolean flagDelete;
    @ManyToOne
    @JoinColumn(name = "customer_type_id",referencedColumnName = "id")
    private CustomerType customerType;
    @OneToMany(mappedBy = "customer")
    private Set<Contract> contracts;

    public CustomerType getCustomerType() {
        return customerType;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
    }

    public Customer() {
    }

    public Customer(Integer id, String name, String dateOfBirth, String gender, String idCard, String phoneNumber, String email, String address, boolean flagDelete, CustomerType customerType, Set<Contract> contracts) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.idCard = idCard;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.flagDelete = flagDelete;
        this.customerType = customerType;
        this.contracts = contracts;
    }

    public boolean isFragDelete() {
        return flagDelete;
    }

    public void setFragDelete(boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
