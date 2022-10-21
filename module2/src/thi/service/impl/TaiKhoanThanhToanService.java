package thi.service.impl;

import exercise_0.model.Student;
import thi.model.TaiKhoanThanhToan;


import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TaiKhoanThanhToanService implements ITaiKhoanThanhToanService {
    private static Scanner scanner =new Scanner(System.in);
    private static  List<TaiKhoanThanhToan>taiKhoanThanhToanList=new ArrayList<>();


    @Override
    public void themMoiTaiKhoan() {
        TaiKhoanThanhToan taiKhoanThanhToan = this.danhSachTaiKhoanThanhToan();
        taiKhoanThanhToanList.add(taiKhoanThanhToan);
        System.out.println("Thêm mới thành công");
    }

    @Override
    public void xoaTaiKhoan() {
        System.out.println("Nhập id tài khoản cần xóa: ");
        int idTaiKhoan = Integer.parseInt(scanner.nextLine());
        boolean luaChon = false;
        for (int i = 0; i < taiKhoanThanhToanList.size(); i++) {
            if (taiKhoanThanhToanList.get(i).getIdTaiKhoan()==(idTaiKhoan)) {
                System.out.println("Bạn muốn xóa tài khoản này không ? Nhập Y: yes, N: no ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    taiKhoanThanhToanList.remove(i);
                    System.out.println("Xóa thành công!");
                }
                luaChon = true;
                break;
            }
        }
        if (!luaChon) {
            System.out.println("Không tìm thấy tài khoản cần xóa!");
        }
    }


    @Override
    public void hienThiDanhSach() {
        for (TaiKhoanThanhToan taiKhoanThanhToan : taiKhoanThanhToanList) {
            System.out.println(taiKhoanThanhToan);
        }
    }

    @Override
    public void timKiem() {
        System.out.println("nhập vào id tài khoản cần tìm");
        int idTaiKhoan = Integer.parseInt(scanner.nextLine());
        for (int i = 0; i < taiKhoanThanhToanList.size(); i++) {
            if (taiKhoanThanhToanList.get(i).getIdTaiKhoan()==(idTaiKhoan)) {
                System.out.println(taiKhoanThanhToanList.get(i));
            }
        }

    }
    public TaiKhoanThanhToan  danhSachTaiKhoanThanhToan(){
        System.out.println("Mời bạn nhập id tài khoản");
        int idTaiKhoan=Integer.parseInt(scanner.nextLine());
        System.out.println("Mời bạn nhập mã tài khoản");
        String maTaiKhoan=scanner.nextLine();
        System.out.println("Mời bạn nhập tên chủ tài khoản");
        String tenChuTaiKhoan=scanner.nextLine();
        System.out.println("mời bạn nhập ngày tạo tài khoản (định dạng dd/MM/yyyy)");
        String ngayTaoTaiKhoan = scanner.nextLine();
        System.out.println("nhập vào tài khoản thanh toán");
        int soThe=Integer.parseInt(scanner.nextLine());
        System.out.println("nhập số tiền trong tài khoản");
        int soTienTrongTaiKhoan=Integer.parseInt(scanner.nextLine());
        TaiKhoanThanhToan taiKhoanThanhToan =new TaiKhoanThanhToan(idTaiKhoan,maTaiKhoan,tenChuTaiKhoan,ngayTaoTaiKhoan,soThe,soTienTrongTaiKhoan);
        return taiKhoanThanhToan;
    }


}
