package com.be.service;

import com.be.model.account.Role;
import com.be.model.account.RoleName;

import java.util.List;
import java.util.Optional;

public interface  IRolesService {
Optional<Role>findByName(RoleName roleName);
List<Role>findAll();
}
