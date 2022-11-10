package service;

import model.Customer;

import java.util.List;

public interface ICustomerService {
    List<Customer> finAll();
    boolean add(Customer customer);
    boolean delete(int id);
    boolean edit(Customer customer);
    Customer findById (int id);
    List<Customer>  search(String name);
}
