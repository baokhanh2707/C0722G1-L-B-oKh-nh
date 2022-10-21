package thi.controller;

import thi.service.impl.ITaiKhoanThanhToanService;
import thi.service.impl.ITaiKhoanTietKiemService;
import thi.service.impl.TaiKhoanThanhToanService;
import thi.service.impl.TaiKhoanTietKiemService;

import java.util.Scanner;

public class TaiKhoanTietKiemController {
    private static Scanner scanner=new Scanner(System.in);
    private static ITaiKhoanTietKiemService iTaiKhoanTietKiemService=new TaiKhoanTietKiemService();
    public static void danhSachTaiKhoanTietKiem() {
        System.out.println("----------------------");
        System.out.println("Mời bạn chọn chức năng");
        System.out.println("Tài Khoản tiết kiệm");
        System.out.println("1.thêm mới tài khoản tiết kiệm");
        System.out.println("2.Xóa tài khoản tiết kiệm");
        System.out.println("3.Xem danh sách tài khoản tiết kiệm ");
        System.out.println("4.Tìm kiếm tài khoản tiết kiệm");
        System.out.println("5.thoát");
        int choice = Integer.parseInt(scanner.nextLine());
        switch (choice) {
            case 1 :
                iTaiKhoanTietKiemService.themMoiTaiKhoan();
                break;
            case 2 :
                iTaiKhoanTietKiemService.xoaTaiKhoan();
                break;
            case 3 :
                iTaiKhoanTietKiemService.hienThiDanhSach();
                break;
            case 4 :
                iTaiKhoanTietKiemService.timKiem();
                break;
            case 5 :
                TaiKhoanController.DanhSachTaiKhoan();
                break;
            default:
                System.out.println("Bạn nhập sai rồi!");
        }
    }
}
