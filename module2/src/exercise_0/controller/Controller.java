package exercise_0.controller;

import java.util.Scanner;

public class Controller {
    private static Scanner scanner = new Scanner(System.in);

    public static void menuCodeGym()  {
        while (true) {
            System.out.println("Nhập lựa chon chương trình của bạn:");
            System.out.println("1.quản lý học sinh");
            System.out.println("2.quản lý giáo viên");
            System.out.println("3.Thoát.");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    StudentController.menuStudent();
                    break;
                case 2:
                    TeacherController.menuTeacher();
                    break;
                case 3:
                    System.exit(0);
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi!");
            }

        }
    }
}
