package service;

import model.Customer;

import java.util.List;

public interface ICustomerService {
    List<Customer> finAll();
    boolean add(Customer customer);
}
