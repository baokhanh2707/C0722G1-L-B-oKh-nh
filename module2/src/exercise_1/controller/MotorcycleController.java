package exercise_1.controller;

import exercise_1.service.IMotorcycleService;
import exercise_1.service.impl_motorcycle.MotorcycleService;

import java.util.Scanner;

public class MotorcycleController {
    private static Scanner scanner = new Scanner(System.in);
    private static IMotorcycleService iMotorcycleService=new MotorcycleService();


    public static void menuMotorcycle() {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới phương tiện xe máy");
            System.out.println("2.hiển thị danh sách phương tiện xe máy");
            System.out.println("3. xóa phương tiện xe máy");
            System.out.println("4.tìm kiếm theo biển kiểm soát xe máy ");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iMotorcycleService.addMotorcycle();
                    break;
                case 2:
                    iMotorcycleService.displayMotorcycle();
                    break;
                case 3:
                    iMotorcycleService.removeMotorcycle();
                    break;
                case 4:
                    iMotorcycleService.searchMotorcycle();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi");
            }

        }
    }
}
