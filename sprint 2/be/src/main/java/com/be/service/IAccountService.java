package com.be.service;

import com.be.model.Account;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUserName(@Param("name") String nameAccount);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(@Param("name")String usernameAccount);
    Account save(Account account);
}
