package thi.controller;


import thi.service.impl.ITaiKhoanThanhToanService;
import thi.service.impl.TaiKhoanThanhToanService;

import java.util.Scanner;

public class TaiKhoanThanhToanController {
    private static Scanner scanner=new Scanner(System.in);
    private static ITaiKhoanThanhToanService iTaiKhoanThanhToanService=new TaiKhoanThanhToanService();
    public static void danhSachTaiKhoanThanhToan() {
        System.out.println("----------------------");
        System.out.println("Mời bạn chọn chức năng");
        System.out.println("Tài Khoản thanh toán");
        System.out.println("1.thêm mới tài khoản thanh toán");
        System.out.println("2.Xóa tài khoản thanh toán");
        System.out.println("3.Xem danh sách tài khoản thanh toán ");
        System.out.println("4.Tìm kiếm tài khoản thanh toán");
        System.out.println("5.thoát");
        int choice = Integer.parseInt(scanner.nextLine());
        switch (choice) {
            case 1 :
                iTaiKhoanThanhToanService.themMoiTaiKhoan();
                break;
            case 2 :
                iTaiKhoanThanhToanService.xoaTaiKhoan();
                break;
            case 3 :
                iTaiKhoanThanhToanService.hienThiDanhSach();
                break;
            case 4 :
                iTaiKhoanThanhToanService.timKiem();
                break;
            case 5 :
                TaiKhoanController.DanhSachTaiKhoan();
                break;
            default:
                System.out.println("Bạn nhập sai rồi!");
        }
    }
}
