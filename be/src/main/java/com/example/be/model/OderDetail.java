package com.example.be.model;

import javax.persistence.*;

@Entity
public class OderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOderDetail;
    private Long quantity;
    @ManyToOne
    private Product product;
    @ManyToOne()
    private Oder oder;


}
