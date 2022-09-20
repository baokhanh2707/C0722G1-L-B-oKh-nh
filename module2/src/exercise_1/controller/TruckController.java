package exercise_1.controller;

import exercise_1.service.IMotorcycleService;
import exercise_1.service.ITruckService;
import exercise_1.service.impl_motorcycle.MotorcycleService;
import exercise_1.service.impl_truck.TruckService;

import java.util.Scanner;

public class TruckController {
    private static Scanner scanner = new Scanner(System.in);
    private static ITruckService iTruckService=new TruckService();


    public static void menuTruck() {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới phương tiện xe tải");
            System.out.println("2.hiển thị danh sách phương tiện xe tải");
            System.out.println("3. xóa phương tiện xe tải");
            System.out.println("4.tìm kiếm theo biển kiểm soát xe tải ");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iTruckService.addTruck();
                    break;
                case 2:
                    iTruckService.displayTruck();
                    break;
                case 3:
                    iTruckService.removeTruck();
                    break;
                case 4:
                    iTruckService.searchTruck();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi");
            }

        }
    }
}
