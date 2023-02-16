package com.be.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class OriginalProduct {
    @Id
    private Long id;
    private String name;
    @OneToMany(mappedBy = "originalProductId")
    public Set<Laptop> laptops;

    public OriginalProduct() {
    }
}
