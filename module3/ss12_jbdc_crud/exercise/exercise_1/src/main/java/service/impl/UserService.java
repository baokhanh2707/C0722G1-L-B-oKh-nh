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

    private final String SEARCH = "select*from `user` where country = ?;";
    private final String SORT = "SELECT * FROM `user` ORDER BY `name`;";

    private IUserRepository userRepository = new UserRepository();

    @Override
    public List<User> finAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> search(String countryUser) {

        return userRepository.search(countryUser);
    }

    @Override
    public List<User> sort(String nameUser) {

        return userRepository.sort(nameUser);
    }

    @Override
    public User getUserById(int id) {
        return userRepository.getUserById(id);
    }

    @Override
    public void insertUserStore(User user) {
        userRepository.insertUser(user);
    }

    @Override
    public void insertUpdateWithoutTransaction() {
        userRepository.insertUpdateWithoutTransaction();
    }

    @Override
    public void insertUpdateUseTransaction() {
        userRepository.insertUpdateUseTransaction();
    }

    @Override
    public User selectUser(int id) {
        return userRepository.selectUser(id);
    }

    @Override
    public void insertUser(User newUser) {
        userRepository.insertUser(newUser);
    }

    @Override
    public boolean updateUser(User book) {
        return userRepository.updateUser(book);
    }

    @Override
    public boolean deleteUser(int id) {
        return userRepository.deleteUser(id);
    }


}
