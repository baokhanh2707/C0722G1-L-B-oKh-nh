package com.user.service.impl;

import com.user.model.Login;
import com.user.model.User;
import com.user.repository.IUserRepository;
import com.user.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository iUserRepository;
    @Override
    public User checkLogin(Login login) {
        return iUserRepository.checkLogin(login);
    }
}
