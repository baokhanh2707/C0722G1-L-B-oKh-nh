package com.be.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class TypeProduct {
    @Id
    private Long id;
    private String name;
    @OneToMany(mappedBy = "typeProductId")
    public Set<Laptop> laptopSet;

    public TypeProduct() {
    }
}
