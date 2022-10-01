package exercise_0.controller;

import exercise_0.service.ITeacherService;
import exercise_0.service.impl_teacher.TeacherService;

import java.io.IOException;
import java.util.Scanner;

public class TeacherController {
    private static Scanner scanner = new Scanner(System.in);
    private static ITeacherService iTeacherService = new TeacherService();
    private static TeacherController teacherController = new TeacherController();

    public static void menuTeacher() throws IOException {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới giáo viên");
            System.out.println("2.hiển thị danh sách giáo viên");
            System.out.println("3.xóa giáo viên");
            System.out.println("4.tìm kiếm  giáo viên");
            System.out.println("5.sắp xếp giáo viên theo tên  ");
            System.out.println("6.thoát");
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
                    teacherController.searchTeacher();
                case 5:
                    iTeacherService.sortTeacher();
                case 6:
                    Controller.menuCodeGym();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi");
            }
        }
    }

    void searchTeacher() {
        System.out.println("1.bạn muốn tìm kiếm theo id ");
        System.out.println("2.bạn muốn tìm kiếm theo tên");
        int choice = Integer.parseInt(scanner.nextLine());
        switch (choice) {
            case 1:
                iTeacherService.searchByBiologicalId();
                break;
            case 2:
                iTeacherService.searchByBiologicaName();
                break;
        }
    }
}
