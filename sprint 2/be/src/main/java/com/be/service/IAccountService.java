package com.be.service;

import com.be.model.account.Account;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUserName(String userName);
    Boolean existsByEmail(String email);
    Boolean existsByUsername (String userName);
//    Account save(Account account);
}
