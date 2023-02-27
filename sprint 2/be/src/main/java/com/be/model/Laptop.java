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
    private String processor;
    private String ram;
    private String memory;
    private String graphicsCard;
    private String screen;
    private String size;
    private String image;
    private String operatingSystem;
    private boolean flagDelete = false;
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

    public String getProcessor() {
        return processor;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getMemory() {
        return memory;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }

    public String getGraphicsCard() {
        return graphicsCard;
    }

    public void setGraphicsCard(String graphicsCard) {
        this.graphicsCard = graphicsCard;
    }

    public String getScreen() {
        return screen;
    }

    public void setScreen(String screen) {
        this.screen = screen;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    public boolean isFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(boolean flagDelete) {
        this.flagDelete = flagDelete;
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