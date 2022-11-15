package service;

import model.ThuePhongTro;

import java.util.List;

public interface IThuePhongTroService {
    List<ThuePhongTro> findAll();
    List<ThuePhongTro>  searchName(String tenNguoiThueTro);
    List<ThuePhongTro>  searchId(int maPhongTro);
    boolean delete(int maPhongTro);
    boolean add(ThuePhongTro thuePhongTro);
}
