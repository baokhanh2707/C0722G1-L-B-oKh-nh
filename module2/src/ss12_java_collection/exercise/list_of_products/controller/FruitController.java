package ss12_java_collection.exercise.list_of_products.controller;

import ss12_java_collection.exercise.list_of_products.service.FruitService;
import ss12_java_collection.exercise.list_of_products.service.IFruitService;

import java.util.Scanner;

public class FruitController {

    private static Scanner scanner = new Scanner(System.in);
    IFruitService iFruitService = new FruitService();

    public static void menuFruit() {
        while (true) {
            System.out.println("-------------------------------");
            System.out.println("DANH SÁCH SẢN PHẨM");
            System.out.println("1.Thêm sản phẩm");
            System.out.println("2.Sửa thông tin sản phẩm theo id");
            System.out.println("3.Xóa sản phẩm theo id");
            System.out.println("4.Hiển thị danh sách sản phẩm");
            System.out.println("5.Tìm kiểm sản phẩm theo tên");
            System.out.println("6.Sắp xếp sản phẩm tăng dần ,giảm dần theo giá");
            System.out.println("7.thoát");
            int choice = Integer.parseInt(scanner.nextLine());
//            switch (choice) {
//                case 1:
//                    IFruitService.addFruit();
//                case 2:
//                    IFruitService.editFruit();
//                case 3:
//                    IFruitService.removeFruit();
//                case 4:
//                    IFruitService.displayFruit();
//                case 5:
//                    IFruitService.searchFruit();
//                case 6:
//                    IFruitService.sortFruit();
            }

        }
    }
}
