package com.be.repository.account;

import com.be.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IAccountRepository extends JpaRepository<Account,Long> {

    @Query(value = "select id_account, email, encrypt_password, name, username_account,flag_delete from account where flag_delete = false and username_account = :username_account",
            countQuery = "select id_account, email, encrypt_password, name, username_account,flag_delete from account where flag_delete = false and username_account = :username_account",
            nativeQuery = true)
    Optional<Account> findByUsername(@Param("username_account") String usernameAccount);
    @Query(value = "select username_account from account where username_account = :username_account",
            countQuery = "select username_account from account where username_account = :username_account",
            nativeQuery = true)
    Boolean existsByUsername(@Param("username_account")String usernameAccount);
    @Query(value = "select email from account where email = :?",
            countQuery = "select email from account where email = :?",
            nativeQuery = true)
    Boolean existsByEmail(String email);
}
