package thi.model;

import java.time.LocalDate;

public class TaiKhoanTietKiem extends TaiKhoan {
    private int soTienGuiTietKiem;
    private String ngayGuiTietKiem;
    private double laiSuat;
    private int soThang;

    public String getNgayGuiTietKiem() {
        return ngayGuiTietKiem;
    }

    public void setNgayGuiTietKiem(String ngayGuiTietKiem) {
        this.ngayGuiTietKiem = ngayGuiTietKiem;
    }

    public TaiKhoanTietKiem(int soTienGuiTietKiem, String ngayGuiTietKiem, double laiSuat, int soThang) {
        this.soTienGuiTietKiem = soTienGuiTietKiem;
        this.ngayGuiTietKiem = ngayGuiTietKiem;
        this.laiSuat = laiSuat;
        this.soThang = soThang;
    }

    public TaiKhoanTietKiem(int idTaiKhoan, String maTaiKhoan, String tenChuTaiKhoan, String ngayTaoTaiKhoan, int soTienGuiTietKiem, String ngayGuiTietKiem, double laiSuat, int soThang) {
        super(idTaiKhoan, maTaiKhoan, tenChuTaiKhoan, ngayTaoTaiKhoan);
        this.soTienGuiTietKiem = soTienGuiTietKiem;
        this.ngayGuiTietKiem = ngayGuiTietKiem;
        this.laiSuat = laiSuat;
        this.soThang = soThang;
    }

    public int getSoTienGuiTietKiem() {
        return soTienGuiTietKiem;
    }

    public void setSoTienGuiTietKiem(int soTienGuiTietKiem) {
        this.soTienGuiTietKiem = soTienGuiTietKiem;
    }



    public double getLaiSuat() {
        return laiSuat;
    }

    public void setLaiSuat(double laiSuat) {
        this.laiSuat = laiSuat;
    }

    public int getSoThang() {
        return soThang;
    }

    public void setSoThang(int soThang) {
        this.soThang = soThang;
    }

    @Override
    public String toString() {
        return "TaiKhoanTietKiem{" +
                "soTienGuiTietKiem=" + soTienGuiTietKiem +
                ", ngayGuiTietKiem='" + ngayGuiTietKiem + '\'' +
                ", laiSuat=" + laiSuat +
                ", soThang=" + soThang +
                '}';
    }
}
