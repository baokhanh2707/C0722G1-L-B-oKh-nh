package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class SanPham {
    @Id
    private Long id;
    private String tenSanPham;
    private String xuatXu;
    private int giaTien;
    private String donVi;
    @OneToMany(mappedBy = "tenSanPham")
    @JsonBackReference
    public Set<LoHang> loHangs;

    public SanPham(Long id, String tenSanPham, String xuatXu, int giaTien, String donVi) {
        this.id = id;
        this.tenSanPham = tenSanPham;
        this.xuatXu = xuatXu;
        this.giaTien = giaTien;
        this.donVi = donVi;
    }
    public SanPham() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public String getXuatXu() {
        return xuatXu;
    }

    public void setXuatXu(String xuatXu) {
        this.xuatXu = xuatXu;
    }

    public int getGiaTien() {
        return giaTien;
    }

    public void setGiaTien(int giaTien) {
        this.giaTien = giaTien;
    }

    public String getDonVi() {
        return donVi;
    }

    public void setDonVi(String donVi) {
        this.donVi = donVi;
    }

    public Set<LoHang> getLoHangs() {
        return loHangs;
    }

    public void setLoHangs(Set<LoHang> loHangs) {
        this.loHangs = loHangs;
    }
}
