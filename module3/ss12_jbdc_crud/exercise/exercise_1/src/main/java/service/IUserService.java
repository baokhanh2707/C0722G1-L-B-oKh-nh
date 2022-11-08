package service;

import model.User;

import java.util.List;

public interface IUserService {
    List<User>finAll();
     List<User>search(String countryUser);
    List<User>sort(String nameUser);
    User getUserById(int id);

    void insertUserStore(User user);

    void insertUpdateWithoutTransaction();

    void insertUpdateUseTransaction();
    User selectUser(int id);

    void insertUser(User newUser);

    boolean updateUser(User book);

    boolean deleteUser(int id);
}
