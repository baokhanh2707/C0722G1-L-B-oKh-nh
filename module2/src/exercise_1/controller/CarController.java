package exercise_1.controller;

import exercise_0.controller.Controller;
import exercise_0.service.IStudentService;
import exercise_0.service.impl_student.StudentService;
import exercise_1.service.ICarService;
import exercise_1.service.impl_car.CarService;

import java.util.Scanner;

public class CarController {
    private static Scanner scanner = new Scanner(System.in);
    private static ICarService iCarService = new CarService();

    public static void menuCar() {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới phương tiện xe hơi");
            System.out.println("2.hiển thị danh sách phương tiện xe hơi");
            System.out.println("3. xóa phương tiện xe hơi");
            System.out.println("4.tìm kiếm theo biển kiểm soát xe hơi ");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iCarService.addCar();
                    break;
                case 2:
                    iCarService.displayCar();
                    break;
                case 3:
                    iCarService.removeCar();
                    break;
                case 4:
                    iCarService.searchCar();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi");
            }

        }
    }
}
