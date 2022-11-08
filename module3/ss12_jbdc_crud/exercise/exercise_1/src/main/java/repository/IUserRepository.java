package repository;

import model.User;

import java.util.List;

public interface IUserRepository {
    List<User> findAll();
    List<User>search(String countryUser);
    List<User>sort(String nameUser);

    User getUserById(int id);

    void insertUserStore(User user);

    void insertUpdateWithoutTransaction();

    void insertUpdateUseTransaction();

    public boolean deleteUser(int id);

    public boolean updateUser(User user);

    public void insertUser(User user);

    public User selectUser(int id);
}
