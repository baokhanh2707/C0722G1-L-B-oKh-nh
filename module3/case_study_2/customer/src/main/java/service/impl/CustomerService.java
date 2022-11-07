package service.impl;

import model.Customer;
import repository.ICustomerRepository;
import repository.impl.BaseRepository;
import repository.impl.CustomerRepository;
import service.ICustomerService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class CustomerService implements ICustomerService {
    private ICustomerRepository customerRepository=new CustomerRepository();
    private  static  final  String INSERT = "insert into customer(customer_id  ,customer_type_id,customer_name ,customer_day_of_birth,customer_gender ,customer_id_card ,customer_phone_number,customer_email,customer_address)value (?,?,?,?,?,?,?,?,?);";
    @Override
    public List<Customer> finAll() {
        return customerRepository.findAll();
    }

    @Override
    public boolean add(Customer customer) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps=connection.prepareStatement(INSERT);
            ps.setInt(1,customer.getId());
            ps.setInt(2,customer.getIdType());
            ps.setString(3,customer.getName());
            ps.setString(4,customer.getDayOfBirth());
            ps.setString(5,customer.getGender());
            ps.setString(6,customer.getIdCard());
            ps.setString(7,customer.getPhoneNumber());
            ps.setString(8,customer.getEmail());
            ps.setString(9,customer.getAddress());
            return ps.executeUpdate()>0;

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }
}
