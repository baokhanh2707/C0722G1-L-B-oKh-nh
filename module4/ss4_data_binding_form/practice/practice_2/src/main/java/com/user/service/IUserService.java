package com.user.service;

import com.user.model.Login;
import com.user.model.User;

public interface IUserService {
    User checkLogin(Login login);
}
