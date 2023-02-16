package com.be.model;

import javax.persistence.*;

@Entity
public class OderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantity;
    @ManyToOne
    private Laptop laptop;
    @ManyToOne()
    private Oder oder;

    public OderDetail() {
    }
}
