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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCpuType() {
        return cpuType;
    }

    public void setCpuType(String cpuType) {
        this.cpuType = cpuType;
    }

    public String getCpuSpeed() {
        return cpuSpeed;
    }

    public void setCpuSpeed(String cpuSpeed) {
        this.cpuSpeed = cpuSpeed;
    }

    public String getRamLaptop() {
        return ramLaptop;
    }

    public void setRamLaptop(String ramLaptop) {
        this.ramLaptop = ramLaptop;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getDimensionsAndWeight() {
        return dimensionsAndWeight;
    }

    public void setDimensionsAndWeight(String dimensionsAndWeight) {
        this.dimensionsAndWeight = dimensionsAndWeight;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public OriginalProduct getOriginalProductId() {
        return originalProductId;
    }

    public void setOriginalProductId(OriginalProduct originalProductId) {
        this.originalProductId = originalProductId;
    }

    public TypeProduct getTypeProductId() {
        return typeProductId;
    }

    public void setTypeProductId(TypeProduct typeProductId) {
        this.typeProductId = typeProductId;
    }

    public Set<OderDetail> getOderDetailSet() {
        return oderDetailSet;
    }

    public void setOderDetailSet(Set<OderDetail> oderDetailSet) {
        this.oderDetailSet = oderDetailSet;
    }
}
