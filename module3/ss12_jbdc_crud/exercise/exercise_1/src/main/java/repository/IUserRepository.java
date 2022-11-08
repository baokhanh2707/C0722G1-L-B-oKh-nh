package repository;

import model.User;

import java.util.List;

public interface IUserRepository {
    boolean add(User user);

    List<User> findByCountry(String str);

    List<User> findAll();

    boolean remove(int id);

    boolean update(int id,User user);

    List<User> getUserById(int id);

    boolean insertUserStore(User user);

    void addUserTransaction();
}