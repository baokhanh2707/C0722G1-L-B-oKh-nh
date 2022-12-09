package com.case_study.demo.model.contract;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "attach_facility")
public class AttachFacility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double cost;

    private String unit;

    private String status;

    @OneToMany(mappedBy = "attachFacility")
    private Set<ContractDetail> contractDetails;
}