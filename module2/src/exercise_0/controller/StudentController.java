package exercise_0.controller;

import exercise_0.service.IStudentService;
import exercise_0.service.impl.StudentService;

import java.util.Scanner;

public class StudentController {
    private static Scanner scanner = new Scanner(System.in);
    private static IStudentService iStudentService = new StudentService();

    public static void menuStudent() {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới học sinh");
            System.out.println("2.hiển thị danh sách học sinh");
            System.out.println("3.xóa học sinh");
            System.out.println("4.thoát. ");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iStudentService.addStudent();
                    break;
                case 2:
                    iStudentService.displayAllStudent();
                    break;
                case 3:
                    iStudentService.removeStudent();
                case 4:
            }
        }
    }
}