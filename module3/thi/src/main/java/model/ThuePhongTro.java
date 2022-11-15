package model;

import java.util.Date;

public class ThuePhongTro {
    private int maPhongTro;
    private String tenNguoiThueTro;
    private String soDienThoai;
    private String ngayBatDau;
    private int maHinhThucThanhToan;
    private String ghiChu;
    private String tenHinhThucThanhToan;

    public ThuePhongTro(int maPhongTro, String tenNguoiThueTro, String soDienThoai, String ngayBatDau, int maHinhThucThanhToan, String ghiChu) {
        this.maPhongTro = maPhongTro;
        this.tenNguoiThueTro = tenNguoiThueTro;
        this.soDienThoai = soDienThoai;
        this.ngayBatDau = ngayBatDau;
        this.maHinhThucThanhToan = maHinhThucThanhToan;
        this.ghiChu = ghiChu;
    }

    public ThuePhongTro(String tenNguoiThueTro, String soDienThoai, String ngayBatDau, int maHinhThucThanhToan, String ghiChu) {
        this.tenNguoiThueTro = tenNguoiThueTro;
        this.soDienThoai = soDienThoai;
        this.ngayBatDau = ngayBatDau;
        this.maHinhThucThanhToan = maHinhThucThanhToan;
        this.ghiChu = ghiChu;
    }

    public ThuePhongTro( int maPhongTro, String tenNguoiThueTro, String soDienThoai, String ngayBatDau, int maHinhThucThanhToan, String ghiChu, String tenHinhThucThanhToan) {
        this.maPhongTro = maPhongTro;
        this.tenNguoiThueTro = tenNguoiThueTro;
        this.soDienThoai = soDienThoai;
        this.ngayBatDau = ngayBatDau;
        this.maHinhThucThanhToan = maHinhThucThanhToan;
        this.ghiChu = ghiChu;
        this.tenHinhThucThanhToan = tenHinhThucThanhToan;
    }

    public ThuePhongTro() {
    }
    public int getMaPhongTro() {
        return maPhongTro;
    }

    public void setMaPhongTro(int maPhongTro) {
        this.maPhongTro = maPhongTro;
    }

    public String getTenNguoiThueTro() {
        return tenNguoiThueTro;
    }

    public void setTenNguoiThueTro(String tenNguoiThueTro) {
        this.tenNguoiThueTro = tenNguoiThueTro;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(String ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public int getMaHinhThucThanhToan() {
        return maHinhThucThanhToan;
    }

    public void setMaHinhThucThanhToan(int maHinhThucThanhToan) {
        this.maHinhThucThanhToan = maHinhThucThanhToan;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getTenHinhThucThanhToan() {
        return tenHinhThucThanhToan;
    }

    public void setTenHinhThucThanhToan(String tenHinhThucThanhToan) {
        this.tenHinhThucThanhToan = tenHinhThucThanhToan;
    }
}
