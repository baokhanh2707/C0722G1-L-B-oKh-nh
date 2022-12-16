package com.example.baitap.model;

import javax.persistence.*;

@Entity
public class SuatChieu {
    @Id
    @Column(columnDefinition = "varchar(25)")
    private String id;
    private String ngayChieu;
    private Long soLuongVe;
    @Column(columnDefinition = "bit default false")
    private boolean flagDelete;

    @ManyToOne
    private Phim phim;


    public SuatChieu() {
    }

    public boolean isFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNgayChieu() {
        return ngayChieu;
    }

    public void setNgayChieu(String ngayChieu) {
        this.ngayChieu = ngayChieu;
    }

    public Long getSoLuongVe() {
        return soLuongVe;
    }

    public void setSoLuongVe(Long soLuongVe) {
        this.soLuongVe = soLuongVe;
    }

    public Phim getPhim() {
        return phim;
    }

    public void setPhim(Phim phim) {
        this.phim = phim;
    }
}