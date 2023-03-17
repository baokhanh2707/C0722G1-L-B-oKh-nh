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

    public OderDetail() {
    }

    public Long getIdOderDetail() {
        return idOderDetail;
    }

    public void setIdOderDetail(Long idOderDetail) {
        this.idOderDetail = idOderDetail;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Oder getOder() {
        return oder;
    }

    public void setOder(Oder oder) {
        this.oder = oder;
    }
}
