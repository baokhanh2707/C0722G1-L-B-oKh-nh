package thi.controller;

import java.util.Scanner;

public class TaiKhoanController {
    private static Scanner scanner = new Scanner(System.in);

    public static void DanhSachTaiKhoan() {
        while (true) {
            System.out.println("------------------------");
            System.out.println("WELCOM Chương trình quản lý tài khoản ngân hàng");
            System.out.println("Mời bạn nhập lựa chọn");
            System.out.println("1.Tài khoản tiết khiệm");
            System.out.println("2.Tài khoản thanh toán");
            System.out.println("3.Thoát chương trình");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    TaiKhoanTietKiemController.danhSachTaiKhoanTietKiem();
                    break;
                case 2:
                    TaiKhoanThanhToanController.danhSachTaiKhoanThanhToan();
                    break;
                case 3:
                    System.exit(0);
                default:
                    System.out.println("Bạn nhập sai rồi!");
            }
        }
    }

}