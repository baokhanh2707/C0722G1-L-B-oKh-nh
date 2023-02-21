package com.be.repository.account;

import com.be.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account,Long> {

@Query(value = "SELECT * FROM account where flag_delete=false and name = :name",nativeQuery = true)
    Optional<Account>findByUserName(@Param("name") String nameAccount);

    @Query(value = "select email from account where email = :?",
            countQuery = "select email from account where email = :?",
            nativeQuery = true)
    Boolean existsByEmail(String email);

    @Query(value = "select name from account where name = :name ",
            countQuery = "select name from account where name = :name ",
            nativeQuery = true)
    Boolean existsByUsername(@Param("name")String usernameAccount);
}
