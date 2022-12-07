package com.case_study.demo.model.facility;

import com.case_study.demo.model.contract.Contract;

import javax.persistence.*;
import java.util.Set;

@Entity
    @Table(name = "facility")
    public class Facility {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        private int area;

        private double cost;

        private int maxPeoPel;

        @ManyToOne
        @JoinColumn(name = "facility_type_id", referencedColumnName = "id")
        private FacilityType facilityType;

        @ManyToOne
        @JoinColumn(name = "rent_type_id", referencedColumnName = "id")
        private RentType rentType;

//        @OneToMany(mappedBy = "facility")
//        private Set<Contract> contracts;

        private String standardRoom;

        private String descriptionOtherConvenience;

        private double poolArea;

        private int numberOfFloors;

        @Column(columnDefinition = "text")
        private String facilityFree;

    public Facility() {
    }

    public Facility(Long id, String name, int area, double cost, int maxPeoPel, FacilityType facilityType, RentType rentType, String standardRoom, String descriptionOtherConvenience, double poolArea, int numberOfFloors, String facilityFree) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.cost = cost;
        this.maxPeoPel = maxPeoPel;
        this.facilityType = facilityType;
        this.rentType = rentType;
        this.standardRoom = standardRoom;
        this.descriptionOtherConvenience = descriptionOtherConvenience;
        this.poolArea = poolArea;
        this.numberOfFloors = numberOfFloors;
        this.facilityFree = facilityFree;
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

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public int getMaxPeoPel() {
        return maxPeoPel;
    }

    public void setMaxPeoPel(int maxPeoPel) {
        this.maxPeoPel = maxPeoPel;
    }

    public FacilityType getFacilityType() {
        return facilityType;
    }

    public void setFacilityType(FacilityType facilityType) {
        this.facilityType = facilityType;
    }

    public RentType getRentType() {
        return rentType;
    }

    public void setRentType(RentType rentType) {
        this.rentType = rentType;
    }

    public String getStandardRoom() {
        return standardRoom;
    }

    public void setStandardRoom(String standardRoom) {
        this.standardRoom = standardRoom;
    }

    public String getDescriptionOtherConvenience() {
        return descriptionOtherConvenience;
    }

    public void setDescriptionOtherConvenience(String descriptionOtherConvenience) {
        this.descriptionOtherConvenience = descriptionOtherConvenience;
    }

    public double getPoolArea() {
        return poolArea;
    }

    public void setPoolArea(double poolArea) {
        this.poolArea = poolArea;
    }

    public int getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(int numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    public String getFacilityFree() {
        return facilityFree;
    }

    public void setFacilityFree(String facilityFree) {
        this.facilityFree = facilityFree;
    }
}
