package repository.impl;

import model.Customer;
import repository.ICustomerRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CustomerRepository implements ICustomerRepository {
    private final String SELECT_ALL = "select*from customer;";
    private  final  String INSERT = "insert into customer(customer_id  ,customer_type_id,customer_name ,customer_day_of_birth,customer_gender ,customer_id_card ,customer_phone_number,customer_email,customer_address)value (?,?,?,?,?,?,?,?,?);";
    private final String DELETE = "call delete_id(?);";
    private final String UPDATE = " update customer set customer_type_id= ?,customer_name =? ,customer_day_of_birth=? , customer_gender=? , customer_id_card=? , customer_phone_number=? , customer_email=? , customer_address=? where customer_id =? ;";
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

    @Override
    public boolean add(Customer customer) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps=connection.prepareStatement(INSERT);
            ps.setInt(1,customer.getId());
            ps.setInt(2,customer.getIdType());
            ps.setString(3,customer.getName());
            ps.setDate(4, Date.valueOf(customer.getDayOfBirth()));
            ps.setBoolean(5, Boolean.parseBoolean(customer.getGender()));
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

    @Override
    public boolean delete(int id) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement preparedStatement =connection.prepareStatement(DELETE);
            preparedStatement.setInt(1,id);
            preparedStatement.executeUpdate();
            return preparedStatement.executeUpdate()>0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean edit(int id , Customer customer) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps=connection.prepareStatement(UPDATE);
            ps.setInt(1,customer.getId());
            ps.setInt(2,customer.getIdType());
            ps.setString(3,customer.getName());
            ps.setDate(4, Date.valueOf(customer.getDayOfBirth()));
            ps.setBoolean(5, Boolean.parseBoolean(customer.getGender()));
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
