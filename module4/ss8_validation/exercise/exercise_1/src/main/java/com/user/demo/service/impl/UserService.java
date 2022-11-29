package com.user.demo.service.impl;

import com.user.demo.model.User;
import com.user.demo.repository.IUserRepository;
import com.user.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public void save(User user) {
        iUserRepository.save(user);
    }
}
