package ss17_binary_file_serialization.exercise.product_manager_saves_to_binary_files.controller;


import ss17_binary_file_serialization.exercise.product_manager_saves_to_binary_files.service.impl.CarService;
import ss17_binary_file_serialization.exercise.product_manager_saves_to_binary_files.service.impl.ICarService;

import java.io.FileNotFoundException;
import java.util.Scanner;

public class CarController {
    private static Scanner scanner = new Scanner(System.in);
    private static ICarService iCarService =  new CarService();

    public static void menuCar()  {
        while (true) {
            System.out.println("MENU SẢN PHẨM");
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới phương tiện xe hơi");
            System.out.println("2.hiển thị danh sách phương tiện xe hơi");
            System.out.println("3.tìm kiếm theo biển kiểm soát xe hơi ");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iCarService.addCar();
                    break;
                case 2:
                    iCarService.displayCar();
                    break;
                case 3:
                    iCarService.searchCar();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi");
            }

        }
    }
}
