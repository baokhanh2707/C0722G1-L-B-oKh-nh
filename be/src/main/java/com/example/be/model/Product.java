package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduct;
    private String nameProduct;
    private String modelYear ;
    private String engine;
    private String mileage;
    private String interior;
    private String power;
    @ManyToOne
    private TypeProduct typeProductId;
    @OneToMany(mappedBy = "product")
    private List<ImageProduct> imageProducts;
    @OneToMany(mappedBy = "product")
    public Set<OderDetail> oderDetailSet;
    @OneToMany(mappedBy = "product")
    @JsonBackReference
    private List<CartDetail> cartDetailList;
}
