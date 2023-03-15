package com.example.be.model;

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
    public Set<Product> products;
}
