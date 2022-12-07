package com.case_study.demo.model.facility;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "rent_type")
public class RentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "rentType")
    private Set<Facility> facilities;

    public RentType() {
    }

    public RentType(Long id, String name, Set<Facility> facilities) {
        this.id = id;
        this.name = name;
        this.facilities = facilities;
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

    public Set<Facility> getFacilities() {
        return facilities;
    }

    public void setFacilities(Set<Facility> facilities) {
        this.facilities = facilities;
    }
}
