package com.be.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "typeProductId")
    public Set<Laptop> laptopSet;

    public TypeProduct() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Laptop> getLaptopSet() {
        return laptopSet;
    }

    public void setLaptopSet(Set<Laptop> laptopSet) {
        this.laptopSet = laptopSet;
    }
}
