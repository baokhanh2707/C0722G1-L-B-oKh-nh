package exercise_0.controller;

import exercise_0.service.IStudentService;
import exercise_0.service.impl_student.StudentService;

import java.util.Scanner;

public class StudentController {
    private static Scanner scanner = new Scanner(System.in);
    private static IStudentService iStudentService = new StudentService();
    private static StudentController studentController = new StudentController();

    public static void menuStudent() {
        while (true) {
            System.out.println("-----------------------------");
            System.out.println("1.thêm mới học sinh");
            System.out.println("2.hiển thị danh sách học sinh");
            System.out.println("3.xóa học sinh");
            System.out.println("4.tìm kiếm học sinh");
            System.out.println("5.sắp xếp học sinh theo tên");
            System.out.println("6.thoát. ");
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
                    break;
                case 4:
                    studentController.searchStudent();
                    break;
                case 5:
                    iStudentService.sortStudent();
                case 6:
                    Controller.menuCodeGym();
                    break;

                default:
                    System.out.println("Bạn nhập sai rồi");
            }
        }
    }

    void searchStudent() {
        System.out.println("1.bạn muốn tìm kiếm theo id ");
        System.out.println("2.bạn muốn tìm kiếm theo tên");
        int choice = Integer.parseInt(scanner.nextLine());
        switch (choice) {
            case 1:
                iStudentService.searchByBiologicalId();
                break;
            case 2:
                iStudentService.searchByBiologicaName();
                break;
        }
    }
}