package ss12_java_collection.exercise.list_of_products.controller;

import ss12_java_collection.exercise.list_of_products.service.impl.FruitService;
import ss12_java_collection.exercise.list_of_products.service.IFruitService;

import java.util.Scanner;

public class FruitController {

    private static Scanner scanner = new Scanner(System.in);
    private static IFruitService iFruitService = new FruitService();

    public static void menuFruit() {
        while (true) {
            System.out.println("-------------------------------");
            System.out.println("DANH SÁCH SẢN PHẨM");
            System.out.println("1.Thêm sản phẩm");
            System.out.println("2.Sửa thông tin sản phẩm theo id");
            System.out.println("3.Xóa sản phẩm theo id");
            System.out.println("4.Hiển thị danh sách sản phẩm");
            System.out.println("5.Tìm kiểm sản phẩm theo tên");
            System.out.println("6.Sắp xếp sản phẩm tăng dần  theo giá");
            System.out.println("7.Sắp xếp sản phẩm giảm dần theo giá");
            System.out.println("8.thoát");
            System.out.println("mời bạn nhập lựa chọn");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iFruitService.addFruit();
                    break;
                case 2:
                    iFruitService.editFruit();
                    break;
                case 3:
                    iFruitService.removeFruit();
                    break;
                case 4:
                    iFruitService.displayFruit();
                    break;
                case 5:
                    iFruitService.searchFruit();
                    break;
                case 6:
                    iFruitService.sortFruitRaise();
                    break;
                case 7:
                    iFruitService.sortFruitReduce();
                case 8:
                    System.exit(10);
            }

        }
    }
}
