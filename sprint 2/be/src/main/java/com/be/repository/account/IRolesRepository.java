package com.be.repository.account;

import com.be.model.account.Role;
import com.be.model.account.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface IRolesRepository extends JpaRepository<Role,Long> {
    @Query(value = "select id_role as idRole,name from roles where name = :?",
            countQuery = "select id_role as idRole,name from roles where name = :?", nativeQuery = true)
    Optional<Role> findByNameRole(RoleName roleName);
    @Query(value = "select id_role as idRole, name from roles where name = :?",
            countQuery = "select id_role as idRole, name from roles where name = :?", nativeQuery = true)
    List<Role> findAllRole();
}
