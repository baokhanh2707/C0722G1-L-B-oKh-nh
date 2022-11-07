package repository.impl;

import model.Customer;
import repository.ICustomerRepository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CustomerRepository implements ICustomerRepository {
    private final String SELECT_ALL = "select*from customer;";
    @Override
    public List<Customer> findAll() {
       List<Customer>customerList=new ArrayList<>();
        Connection connection =BaseRepository.getConnectDB();
        try {
            PreparedStatement ps =connection.prepareStatement(SELECT_ALL);
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()){
                int id =resultSet.getInt("customer_id");
                int idType = resultSet.getInt("customer_type_id");
                String name=resultSet.getString("customer_name");
                String dayOfBirth = resultSet.getString("customer_day_of_birth");
                String gender=resultSet.getString("customer_gender");
                String idCard=resultSet.getString("customer_id_card");
                String phoneNumber=resultSet.getString("customer_phone_number");
                String email = resultSet.getString("customer_email");
                String address=resultSet.getString("customer_address");
                Customer customer=new Customer(id,idType,name,dayOfBirth,gender,idCard,phoneNumber,email,address);
                customerList.add(customer);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
return customerList;
    }

}
