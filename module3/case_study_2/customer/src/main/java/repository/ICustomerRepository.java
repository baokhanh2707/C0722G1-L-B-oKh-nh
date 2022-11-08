package repository;

import model.Customer;

import java.util.List;

public interface ICustomerRepository {
    List<Customer>findAll();
    boolean add(Customer customer);
    boolean delete(int id);
    boolean edit(int id);


}
