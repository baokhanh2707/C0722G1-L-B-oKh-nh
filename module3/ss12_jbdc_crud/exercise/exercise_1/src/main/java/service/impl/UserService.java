package service.impl;

import model.User;
import repository.IUserRepository;
import repository.impl.BaseRepository;
import repository.impl.UserRepository;
import service.IUserService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserService implements IUserService {

    private final String SEARCH="select*from `user` where country = ?;";
    private final String SORT = "SELECT * FROM `user` ORDER BY `name`;";
    private IUserRepository userRepository = new UserRepository();
    @Override
    public List<User> finAll() {
        return userRepository.findAll();
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
        List<User> userList = new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(SORT);
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()) {
                int idUser = resultSet.getInt("id");
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
}

