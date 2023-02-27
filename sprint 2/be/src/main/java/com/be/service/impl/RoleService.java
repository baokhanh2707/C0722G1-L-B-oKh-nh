package com.be.service.impl;

import com.be.model.account.Role;
import com.be.model.account.RoleName;
import com.be.repository.account.IRolesRepository;
import com.be.service.IRolesService;
import org.omg.CORBA.IRObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRolesService {
    @Autowired
    private IRolesRepository iRolesRepository;
    @Override
    public Optional<Role> findByName(RoleName roleName) {
        return iRolesRepository.findByNameRole(roleName);
    }

    @Override
    public List<Role> findAll() {
        return iRolesRepository.findAllRole();
    }
}
