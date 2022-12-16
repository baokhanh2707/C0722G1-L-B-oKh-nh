package com.case_study.demo.repository;

import com.case_study.demo.model.login.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
}
