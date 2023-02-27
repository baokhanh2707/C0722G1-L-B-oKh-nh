package com.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTypeProduct;
    private String nameTypeProduct;

    @OneToMany(mappedBy = "typeProductId")
    @JsonBackReference
    public Set<Laptop> laptopSet;

    public TypeProduct() {
    }

    public Long getIdTypeProduct() {
        return idTypeProduct;
    }

    public void setIdTypeProduct(Long idTypeProduct) {
        this.idTypeProduct = idTypeProduct;
    }

    public String getNameTypeProduct() {
        return nameTypeProduct;
    }

    public void setNameTypeProduct(String nameTypeProduct) {
        this.nameTypeProduct = nameTypeProduct;
    }

    public Set<Laptop> getLaptopSet() {
        return laptopSet;
    }

    public void setLaptopSet(Set<Laptop> laptopSet) {
        this.laptopSet = laptopSet;
    }
}
