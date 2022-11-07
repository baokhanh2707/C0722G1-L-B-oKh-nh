package service;

import model.User;

import java.util.List;

public interface IUserService {
    List<User>finAll();
     List<User>search(String countryUser);
    List<User>sort(String nameUser);
}
