package com.be.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String cpuType;
    private String cpuSpeed;
    private String ramLaptop;
    private String resolution;
    private String dimensionsAndWeight;
    private String image;
    @ManyToOne
    private OriginalProduct originalProductId;
    @ManyToOne
    private TypeProduct typeProductId;
    @OneToMany(mappedBy = "laptop")
    public Set<OderDetail> oderDetailSet;

    public Laptop() {
    }
}
