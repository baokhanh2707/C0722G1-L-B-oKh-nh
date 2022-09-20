package exercise_1.controller;


import exercise_1.model.Motorcycle;
import exercise_1.service.ICarService;
import exercise_1.service.IMotorcycleService;
import exercise_1.service.ITruckService;
import exercise_1.service.impl_motorcycle.MotorcycleService;
import exercise_1.service.impl_truck.TruckService;

import java.util.Scanner;

public class Controller {
    IMotorcycleService iMotorcycleService = new  MotorcycleService();
    public static void menuVehicle() {
        while (true) {
            Scanner scanner =new Scanner(System.in);
            System.out.println("Nhập lựa chon chương trình của bạn:");
            System.out.println("1.hiển thị xe máy");
            System.out.println("2.hiển thị xe hơi");
            System.out.println("3.hiển thị xe tải.");
            System.out.println("4.xóa phương tiện");
            System.out.println("5.tìm kiếm phương tiện");
            System.out.println("thoát");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                   MotorcycleController.menuMotorcycle();
                    break;
                case 2:
                    CarController.menuCar();
                    break;
                case 3:
                    TruckController.menuTruck();
                case 4:
//                    IMotorcycleService.removeMotorcycle();
//
//                    ICarService.removeCar();
//                    ITruckService.removeTruck();
//
//                case 5:
//                    IMotorcycleService.searchMotorcycle();
//                    ICarService.searchCar();
//                    ITruckService.searchTruck();
                case 6:
                    System.exit(0);
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi!");
            }

        }
    }
}