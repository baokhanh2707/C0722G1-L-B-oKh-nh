package com.example.be.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Oder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOder;
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

    public Long getIdOder() {
        return idOder;
    }

    public void setIdOder(Long idOder) {
        this.idOder = idOder;
    }

    public String getOderDate() {
        return oderDate;
    }

    public void setOderDate(String oderDate) {
        this.oderDate = oderDate;
    }

    public String getCodeOder() {
        return codeOder;
    }

    public void setCodeOder(String codeOder) {
        this.codeOder = codeOder;
    }

    public boolean isPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public boolean isDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(boolean deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public Set<OderDetail> getOderDetailSet() {
        return oderDetailSet;
    }

    public void setOderDetailSet(Set<OderDetail> oderDetailSet) {
        this.oderDetailSet = oderDetailSet;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
