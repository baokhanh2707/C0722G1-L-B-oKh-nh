package com.be.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Roles {
    @Id
    private Long idRole;
    private String name;

    public Roles() {
    }
}
