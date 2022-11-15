package reponsitory;

import model.ThuePhongTro;

import java.util.List;

public interface IThuePhongTroReponsitory {
    List<ThuePhongTro> findAll();

    List<ThuePhongTro> searchName(String tenNguoiThueTro);
    List<ThuePhongTro> searchId(int maPhongTro);
    boolean delete(int maPhongTro);
    boolean add(ThuePhongTro thuePhongTro);
}
