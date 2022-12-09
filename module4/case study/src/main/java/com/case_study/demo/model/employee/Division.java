package com.case_study.demo.model.employee;

import com.case_study.demo.model.contract.ContractDetail;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Division {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "division")
    private Set<Employee> division;

    public Division() {
    }

    public Division(Long id, String name, Set<Employee> division) {
        this.id = id;
        this.name = name;
        this.division = division;
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

    public Set<Employee> getDivision() {
        return division;
    }

    public void setDivision(Set<Employee> division) {
        this.division = division;
    }
}
