package com.be.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Oder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String oderDate;
    private String codeOder;
    private boolean paymentStatus;
    private boolean deliveryStatus;
    @OneToMany(mappedBy = "oder")
    public Set<OderDetail> oderDetailSet;
    @ManyToOne
    private Customer customer;

    public Oder() {
    }
}
