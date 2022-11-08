package repository.impl;

import model.User;
import repository.IUserRepository;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserRepository implements IUserRepository {
    private final String SELECT_ALL = "select*from `user`;";
    private final String SEARCH="select*from `user` where country = ?;";
    private static final String SORT = "select * from users ORDER BY `name`;";
    private static final String SQL_INSERT = "INSERT INTO EMPLOYEE (NAME, SALARY, CREATED_DATE) VALUES (?,?,?)";
    private static final String UPDATE_USERS_SQL = "update users set name = ?,email= ?, country =? where id = ?;";
    private static final String SQL_UPDATE = "UPDATE EMPLOYEE SET SALARY=? WHERE NAME=?";
    private static final String SQL_TABLE_DROP = "DROP TABLE IF EXISTS EMPLOYEE";
    private static final String SQL_TABLE_CREATE = "CREATE TABLE EMPLOYEE";
    private static final String INSERT_USERS_SQL = "INSERT INTO users (name, email, country) VALUES (?, ?, ?);";
    private static final String SELECT_USER_BY_ID = "select id,name,email,country from users where id =?";


    @Override
    public List<User> findAll() {
        List<User> userList = new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(SELECT_ALL);
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()) {
                int idUser = resultSet.getInt("id");
                String nameUser = resultSet.getString("name");
                String emailUser = resultSet.getString("email");
                String countryUser = resultSet.getString("country");
                User user = new User(idUser, nameUser, emailUser, countryUser);
                userList.add(user);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return userList;
    }
    @Override
    public  List<User> search(String countryUser) {
        List<User>findUserList=new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();

        try {
            PreparedStatement ps =connection.prepareStatement(SEARCH);
            ps.setString(1,countryUser);
            ResultSet rs =  ps.executeQuery();
            while (rs.next()) {
                int idUser = rs.getInt("id");
                String nameUser = rs.getString("name");
                String emailUser = rs.getString("email");
                User user = new User(idUser, nameUser, emailUser,countryUser);
                findUserList.add(user);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return findUserList;
    }

    @Override
    public List<User> sort(String nameUser) {
        List<User> orderUserList = new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();

        try {

            PreparedStatement statement = connection.prepareStatement(SORT);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String country = resultSet.getString("country");
                orderUserList.add(new User(id, name, email, country));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return orderUserList;
    }



    @Override
    public User getUserById(int id) {
        String query = "call get_user_id(?);";
        Connection connection = BaseRepository.getConnectDB();
        User user = null;
        try {
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setInt(1, id);
            ResultSet resultSet = callableStatement.executeQuery();
            while (resultSet.next()) {
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String country = resultSet.getString("country");
                user = new User(id, name, email, country);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return user;
    }

    @Override
    public void insertUserStore(User user) {
        String query = "call insert_user(?, ?, ?);";

        Connection connection = BaseRepository.getConnectDB();
        try {
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setString(1, user.getNameUser());
            callableStatement.setString(2, user.getEmailUser());
            callableStatement.setString(3, user.getCountryUser());
            callableStatement.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    public void insertUpdateWithoutTransaction() {
        Connection connection = BaseRepository.getConnectDB();
        try {
            Statement statement = connection.createStatement();
            PreparedStatement preparedStatementInsert = connection.prepareStatement(SQL_INSERT);
            PreparedStatement preparedStatementUpdate = connection.prepareStatement(SQL_INSERT);

            statement.execute(SQL_TABLE_DROP);
            statement.execute(SQL_TABLE_CREATE);

            preparedStatementInsert.setString(1, "Hoa");
            preparedStatementInsert.setBigDecimal(2, new BigDecimal(10));
            preparedStatementInsert.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
            preparedStatementInsert.execute();

            preparedStatementInsert.setString(1, "Hoang");
            preparedStatementInsert.setBigDecimal(2, new BigDecimal(20));
            preparedStatementInsert.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
            preparedStatementInsert.execute();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    @Override
    public void insertUpdateUseTransaction() {
        Connection connection = BaseRepository.getConnectDB();

        try {
            connection.setAutoCommit(false);
            Statement statement = connection.createStatement();
            PreparedStatement preparedStatementInsert = connection.prepareStatement(SQL_INSERT);
            PreparedStatement preparedStatementUpdate = connection.prepareStatement(SQL_UPDATE);
            statement.execute(SQL_TABLE_DROP);
            statement.execute(SQL_TABLE_CREATE);
            connection.setAutoCommit(false);

            preparedStatementInsert.setString(1, "Quynh");
            preparedStatementInsert.setBigDecimal(2, new BigDecimal(10));
            preparedStatementInsert.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
            preparedStatementInsert.execute();

            preparedStatementInsert.setString(1, "Ngan");
            preparedStatementInsert.setBigDecimal(2, new BigDecimal(20));
            preparedStatementInsert.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
            preparedStatementInsert.execute();

            preparedStatementUpdate.setBigDecimal(1, new BigDecimal(99.99));


            preparedStatementUpdate.setString(2, "Quynh");

            preparedStatementUpdate.execute();


            connection.commit();


            connection.setAutoCommit(true);

            connection.commit();
            connection.setAutoCommit(true);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    public boolean deleteUser(int id) {
        String query = "call delete_user(?);";
        Connection connection = BaseRepository.getConnectDB();
        CallableStatement statement = null;
        try {
            statement = connection.prepareCall(query);
            statement.setInt(1, id);
            return statement.executeUpdate() > 0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }


        return false;
    }

    @Override
    public boolean updateUser(User user) {
            Connection connection = BaseRepository.getConnectDB();
            PreparedStatement statement = null;
            try {
                statement = connection.prepareStatement(UPDATE_USERS_SQL);
                statement.setString(1, user.getNameUser());
                statement.setString(2, user.getEmailUser());
                statement.setString(3, user.getCountryUser());
                statement.setInt(4, user.getIdUser());
                return statement.executeUpdate() > 0;
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }


            return false;
        }

    @Override
    public void insertUser(User user) {
        System.out.println(INSERT_USERS_SQL);

            Connection connection = BaseRepository.getConnectDB();
        PreparedStatement preparedStatement = null;
        try {
            preparedStatement = connection.prepareStatement(INSERT_USERS_SQL);
            preparedStatement.setString(1, user.getNameUser());
            preparedStatement.setString(2, user.getNameUser());
            preparedStatement.setString(3, user.getCountryUser());
            System.out.println(preparedStatement);
            preparedStatement.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    public User selectUser(int id) {
        User user = null;
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(SELECT_USER_BY_ID);
            preparedStatement.setInt(1, id);
            System.out.println(preparedStatement);
            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                String name = rs.getString("name");
                String email = rs.getString("email");
                String country = rs.getString("country");
                user = new User(id, name, email, country);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return user;
    }
}
