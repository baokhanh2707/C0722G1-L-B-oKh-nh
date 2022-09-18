package exercise_0.controller;

import exercise_0.service.IStudentService;
import exercise_0.service.ITeacherService;
import exercise_0.service.impl.StudentService;
import exercise_0.service.impl.TeacherService;

import java.util.Scanner;

public class TeacherController {
    private static Scanner scanner = new Scanner(System.in);
    private static ITeacherService iTeacherService = new TeacherService();

    public static void menuTeacher() {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới giáo viên");
            System.out.println("2.hiển thị danh sách giáo viên");
            System.out.println("3.xóa giáo viên");
            System.out.println("4.thoát. ");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iTeacherService.addTeacher();
                    break;
                case 2:
                    iTeacherService.displayAllTeacher();
                    break;
                case 3:
                    iTeacherService.removeTeacher();

                    break;
                case 4:
            }
        }
    }
}
