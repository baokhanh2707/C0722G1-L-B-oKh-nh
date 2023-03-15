package com.example.be.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCardDetail;
    private Long quantity;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date createDate;
    private Date modifyDate;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Cart cart;
    @Column(columnDefinition = "bit")
    private boolean flagDeleted = false;
    @Column(columnDefinition = "bit")
    private boolean flagStatus = false;

    public CartDetail() {
    }

    public Long getIdCardDetail() {
        return idCardDetail;
    }

    public void setIdCardDetail(Long idCardDetail) {
        this.idCardDetail = idCardDetail;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
        this.modifyDate = modifyDate;
    }



    public boolean isFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public boolean isFlagStatus() {
        return flagStatus;
    }

    public void setFlagStatus(boolean flagStatus) {
        this.flagStatus = flagStatus;
    }
}
