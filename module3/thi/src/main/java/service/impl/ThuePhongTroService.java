package service.impl;

import model.ThuePhongTro;
import reponsitory.IThuePhongTroReponsitory;
import reponsitory.impl.ThuePhongTroReponsitory;
import service.IThuePhongTroService;

import java.util.List;

public class ThuePhongTroService implements IThuePhongTroService {
    private IThuePhongTroReponsitory thuePhongTroReponsitory =new ThuePhongTroReponsitory();
    @Override
    public List<ThuePhongTro> findAll() {
        return thuePhongTroReponsitory.findAll();
    }
    @Override
    public List<ThuePhongTro> searchName(String tenNguoiThueTro) {
        return thuePhongTroReponsitory.searchName(tenNguoiThueTro);
    }

    @Override
    public List<ThuePhongTro> searchId(int maPhongTro) {
        return thuePhongTroReponsitory.searchId(maPhongTro);
    }

    @Override
    public boolean delete(int maPhongTro) {
        return thuePhongTroReponsitory.delete(maPhongTro);
    }

    @Override
    public boolean add(ThuePhongTro thuePhongTro) {
        return thuePhongTroReponsitory.add(thuePhongTro);
    }
}
