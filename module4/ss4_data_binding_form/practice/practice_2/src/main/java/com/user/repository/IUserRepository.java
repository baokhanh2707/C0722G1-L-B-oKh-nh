package com.user.repository;

import com.user.model.Login;
import com.user.model.User;

public interface IUserRepository {
    User checkLogin(Login login);
}
