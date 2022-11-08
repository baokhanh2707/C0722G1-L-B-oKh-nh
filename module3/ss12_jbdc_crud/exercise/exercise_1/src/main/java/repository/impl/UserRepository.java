package repository.impl;

import model.User;

import repository.IUserRepository;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserRepository implements IUserRepository {
    private static final String INSERT_USERS_SQL = "INSERT INTO users (name, email, country) VALUES (?, ?, ?);";
    private static final String SELECT_USER_BY_COUNTRY = "select * from users where country =?;";
    private static final String SELECT_ALL_USERS = "CALL display_list_user();";
    private static final String DELETE = "call `delete`(?);";
    private static final String UPDATE = "CALL update_info(?,?,?,?);";
    private static final String INSERT_USERS = "CALL insert_user(?,?,?)";
    private static final String SP_FIND_BY_ID_USERS = "CALL get_user_by_id(?)";
    private static final String DROP = "DROP TABLE ?; ";
    private static final String CREATE = "CALL insert_user(?,?,?)";

    @Override
    public List<User> getUserById(int id) {
        Connection connection = BaseRepository.getConnectDB();
        List<User> userList = new ArrayList<>();
        try {
            CallableStatement callableStatement = connection.prepareCall(SP_FIND_BY_ID_USERS);
            callableStatement.setInt(1, id);
            ResultSet resultSet = callableStatement.executeQuery();
            while (resultSet.next()) {
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String country = resultSet.getString("country");
                User user = new User(id, name, email, country);
                userList.add(user);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return userList;
    }

    @Override
    public boolean insertUserStore(User user) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            CallableStatement callableStatement = connection.prepareCall(INSERT_USERS);
            callableStatement.setString(1, user.getNameUser());
            callableStatement.setString(2, user.getEmailUser());
            callableStatement.setString(3, user.getCountryUser());
            return callableStatement.executeUpdate() > 0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    @Override
    public void addUserTransaction() {
        try (Connection connection = BaseRepository.getConnectDB();

             Statement statement = connection.createStatement();

             PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USERS);

             PreparedStatement preparedStatement1 = connection.prepareStatement(UPDATE)) {

            statement.execute(DROP);

            statement.execute(CREATE);


            connection.setAutoCommit(false); // default true


            preparedStatement.setString(1, "Quynh");

            preparedStatement.setBigDecimal(2, new BigDecimal(10));

            preparedStatement.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));

            preparedStatement.execute();


            preparedStatement.setString(1, "Ngan");

            preparedStatement.setBigDecimal(2, new BigDecimal(20));

            preparedStatement.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));

            preparedStatement.execute();

            preparedStatement1.setBigDecimal(2, new BigDecimal(999.99));

            preparedStatement1.setString(2, "Quynh");

            connection.commit();


            connection.setAutoCommit(true);


        } catch (Exception e) {

            System.out.println(e.getMessage());

            e.printStackTrace();

        }

    }

    @Override
    public boolean remove(int id) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(DELETE);
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean add(User user) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(INSERT_USERS_SQL);
            ps.setString(1, user.getNameUser());
            ps.setString(2, user.getEmailUser());
            ps.setString(3, user.getCountryUser());

            return ps.executeUpdate() > 0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;

    }


    @Override
    public boolean update(int id, User user) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE);
            ps.setString(1, user.getNameUser());
            ps.setString(2, user.getEmailUser());
            ps.setString(3, user.getCountryUser());
            ps.setInt(4, user.getIdUser());
            return ps.executeUpdate() > 0;

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;
    }


    @Override
    public List<User> findAll() {
        Connection connection = BaseRepository.getConnectDB();
        List<User> userList = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement(SELECT_ALL_USERS);
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String country = resultSet.getString("country");
                User user = new User(id, name, email, country);
                userList.add(user);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return userList;
    }

    @Override
    public List<User> findByCountry(String str) {
        Connection connection = BaseRepository.getConnectDB();
        List<User> userList = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement(SELECT_USER_BY_COUNTRY);
            ps.setString(1, str);
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String country = resultSet.getString("country");
                User user = new User(id, name, email, country);
                userList.add(user);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return userList;

    }
}