package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class LoHang {
    @Id
    private Long id;
    private String maLoHang;
    @ManyToOne
    @JsonManagedReference
    private SanPham tenSanPham;
    private int soLuong;
    private String ngayNhapHang;
    private String ngaySanXuat;
    private String ngayHetHan;

    public LoHang(Long id, String maLoHang, SanPham tenSanPham, int soLuong, String ngayNhapHang, String ngaySanXuat, String ngayHetHan) {
        this.id = id;
        this.maLoHang = maLoHang;
        this.tenSanPham = tenSanPham;
        this.soLuong = soLuong;
        this.ngayNhapHang = ngayNhapHang;
        this.ngaySanXuat = ngaySanXuat;
        this.ngayHetHan = ngayHetHan;
    }

    public LoHang() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaLoHang() {
        return maLoHang;
    }

    public void setMaLoHang(String maLoHang) {
        this.maLoHang = maLoHang;
    }

    public SanPham getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(SanPham tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public String getNgayNhapHang() {
        return ngayNhapHang;
    }

    public void setNgayNhapHang(String ngayNhapHang) {
        this.ngayNhapHang = ngayNhapHang;
    }

    public String getNgaySanXuat() {
        return ngaySanXuat;
    }

    public void setNgaySanXuat(String ngaySanXuat) {
        this.ngaySanXuat = ngaySanXuat;
    }

    public String getNgayHetHan() {
        return ngayHetHan;
    }

    public void setNgayHetHan(String ngayHetHan) {
        this.ngayHetHan = ngayHetHan;
    }
}