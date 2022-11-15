package reponsitory.impl;

import com.sun.jmx.snmp.SnmpPermission;
import model.ThuePhongTro;
import reponsitory.IThuePhongTroReponsitory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ThuePhongTroReponsitory implements IThuePhongTroReponsitory {
    private final String SELECT_ALL="call select_thue_phong_tro();";
    private final String INSERT="insert into thue_phong_tro(ten_nguoi_thue_tro,so_dien_thoai,ngay_bat_dau,ma_hinh_thuc_thanh_toan,ghi_chu)value(?,?,?,?,?);";
    private final String DELETE="call delete_thue_phong_tro(?);";
    private final String SEARCH_NAME="select * from thue_phong_tro where  ten_nguoi_thue_tro like ? ;";
    private final String SEARCH_ID="select * from thue_phong_tro where ma_phong_tro =? ;";
    @Override
    public List<ThuePhongTro> findAll() {
        List<ThuePhongTro> thuePhongTroList = new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();
            try {
                PreparedStatement ps = connection.prepareStatement(SELECT_ALL);
                ResultSet resultSet = ps.executeQuery();
                while (resultSet.next()) {
                    int maPhongTro=resultSet.getInt("ma_phong_tro");
                    String tenNguoiThueTro=resultSet.getString("ten_nguoi_thue_tro");
                    String soDienThoai=resultSet.getString("so_dien_thoai");
                    String ngayBatDau=resultSet.getString("ngay_bat_dau");
                    int maHinhThucThanhToan=resultSet.getInt("ma_hinh_thuc_thanh_toan");
                    String ghiChu=resultSet.getString("ghi_chu");
                    String tenHinhThucThanhToan=resultSet.getString("ten_hinh_thuc_thanh_toan");
                    ThuePhongTro thuePhongTro=new ThuePhongTro(maPhongTro,tenNguoiThueTro,soDienThoai,ngayBatDau,maHinhThucThanhToan,ghiChu,tenHinhThucThanhToan);
                    thuePhongTroList.add(thuePhongTro);
                }

            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
            return thuePhongTroList;
        }

    @Override
    public List<ThuePhongTro> searchName(String tenNguoiThueTro) {
        List<ThuePhongTro>thuePhongTroSearch=new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(SEARCH_NAME);
            ps.setString(1, "%" + tenNguoiThueTro + "%");
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()) {
                int maPhongTro=resultSet.getInt("ma_phong_tro");
                String tenNguoiThue=resultSet.getString("ten_nguoi_thue_tro");
                String soDienThoai=resultSet.getString("so_dien_thoai");
                String ngayBatDau=resultSet.getString("ngay_bat_dau");
                int maHinhThucThanhToan=resultSet.getInt("ma_hinh_thuc_thanh_toan");
                String ghiChu=resultSet.getString("ghi_chu");
                thuePhongTroSearch.add(new ThuePhongTro(maPhongTro,tenNguoiThue,soDienThoai,ngayBatDau,maHinhThucThanhToan,ghiChu));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return thuePhongTroSearch;
    }

    @Override
    public List<ThuePhongTro> searchId(int maPhongTro) {
        List<ThuePhongTro>thuePhongTroSearch=new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(SEARCH_ID);
            ps.setInt(1,  maPhongTro );
            ResultSet resultSet = ps.executeQuery();
            while (resultSet.next()) {
                int maTro=resultSet.getInt("ma_phong_tro");
                String tenNguoiThue=resultSet.getString("ten_nguoi_thue_tro");
                String soDienThoai=resultSet.getString("so_dien_thoai");
                String ngayBatDau=resultSet.getString("ngay_bat_dau");
                int maHinhThucThanhToan=resultSet.getInt("ma_hinh_thuc_thanh_toan");
                String ghiChu=resultSet.getString("ghi_chu");
                thuePhongTroSearch.add(new ThuePhongTro(maTro,tenNguoiThue,soDienThoai,ngayBatDau,maHinhThucThanhToan,ghiChu));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return thuePhongTroSearch;
    }

    @Override
    public boolean delete(int maPhongTro) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(DELETE);
            preparedStatement.setInt(1, maPhongTro);
            preparedStatement.executeUpdate();
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean add(ThuePhongTro thuePhongTro) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(INSERT);
            ps.setString(1,thuePhongTro.getTenNguoiThueTro());
            ps.setString(2,thuePhongTro.getSoDienThoai());
            ps.setString(3,thuePhongTro.getNgayBatDau());
            ps.setInt(4,thuePhongTro.getMaHinhThucThanhToan());
            ps.setString(5,thuePhongTro.getGhiChu());
            return ps.executeUpdate() > 0;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }
}
