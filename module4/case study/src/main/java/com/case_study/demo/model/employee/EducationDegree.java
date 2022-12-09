package com.case_study.demo.model.employee;

import javax.persistence.*;
import java.util.Set;

@Entity
public class EducationDegree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "educationDegree")
    private Set<Employee> educationDegree;

    public EducationDegree() {
    }

    public EducationDegree(Long id, String name, Set<Employee> educationDegree) {
        this.id = id;
        this.name = name;
        this.educationDegree = educationDegree;
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

    public Set<Employee> getEducationDegree() {
        return educationDegree;
    }

    public void setEducationDegree(Set<Employee> educationDegree) {
        this.educationDegree = educationDegree;
    }
}
