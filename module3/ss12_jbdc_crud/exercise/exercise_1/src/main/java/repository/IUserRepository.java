package repository;

import model.User;

import java.util.List;

public interface IUserRepository {
    List<User> findAll();
    List<User>search(String countryUser,List<User>userList );

}
