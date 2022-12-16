package com.example.baitap.dto;

import com.example.baitap.model.Phim;

import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

public class SuatChieuDto  {
    @Pattern(regexp = "^[C][I][-]+[0-9]{4}$",message = "Mã không đúng định dạng")
    private String id;
    private String ngayChieu;
    @Min(0)
    private Long soLuongVe;

    private Phim phim;

    public SuatChieuDto() {
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

    public Phim getPhim() {
        return phim;
    }

    public void setPhim(Phim phim) {
        this.phim = phim;
    }

    public Long getSoLuongVe() {
        return soLuongVe;
    }

    public void setSoLuongVe(Long soLuongVe) {
        this.soLuongVe = soLuongVe;
    }

}
