package exercise_0.service.impl_teacher;

import exercise_0.model.Student;
import exercise_0.model.Teacher;
import exercise_0.service.ITeacherService;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TeacherService implements ITeacherService {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Teacher> teacherList = new ArrayList<>();

    @Override
    public void addTeacher() {
        Teacher teacher = infoTeacher();
        teacherList.add(teacher);
        System.out.println("Thêm mới thành công");
    }

    @Override
    public void displayAllTeacher() {
        for (Teacher teacher : teacherList) {
            System.out.println(teacher);
        }
    }

    public Teacher infoTeacher() {
        System.out.print("Mời bạn nhập mã Giáo Viên: ");
        String code = scanner.nextLine();
        System.out.print("Mời bạn nhập tên Giáo Viên: ");
        String name = scanner.nextLine();
        System.out.println("Mời nhập ngày sinh Giáo Viên");
        String dateOfBirth = scanner.nextLine();
        System.out.print("Mời bạn nhập giới tính Giáo Viên: ");
        String tempGender = scanner.nextLine();
        Boolean gender;
        if (tempGender.equals("Nam")) {
            gender = true;
        } else if (tempGender.equals("Nữ")) {
            gender = false;
        } else {
            gender = null;
        }
        System.out.print("Mời bạn nhập chuyên môn Giáo Viên: ");
        String specialize = scanner.nextLine();
        Teacher teacher = new Teacher(code, name, dateOfBirth, gender, specialize);
        return teacher;
    }

    @Override
    public void removeTeacher() {
        System.out.print("Mời bạn nhập mã Giáo Viên cần xóa: ");
        String code = scanner.nextLine();
        boolean flagDelete = false;
        for (int i = 0; i < teacherList.size(); i++) {
            if (teacherList.get(i).getCode().equals(code)) {
                System.out.println("Bạn có chác muốn xóa Giáo Viên này không?" +
                        "Nhập Y:xóa ,N:không ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    teacherList.remove(i);
                    System.out.println("Xóa thành công");
                }
                flagDelete = true;
                break;
            }
        }
        if (!flagDelete) {
            System.out.println("Không tìm thấy đối tượng cần xóa.");
        }
    }

    @Override
    public void searchByBiologicalId() {
        System.out.println("nhập vào mã giáo viên cần tìm");
        String code = scanner.nextLine();
        for (int i = 0; i < teacherList.size(); i++) {
            if (teacherList.get(i).getCode().equals(code)) {
                System.out.println(teacherList.get(i));
            }
        }
    }

    @Override
    public void searchByBiologicaName() {
        System.out.println("nhập vào tên giáo viên cần tìm");
        String name = scanner.nextLine();
        for (int i = 0; i < teacherList.size(); i++) {
            if (teacherList.get(i).getName().contains(name)) {
                System.out.println(teacherList.get(i));
            }
        }
    }

    @Override
    public void sortTeacher() {
        for (int i = 0; i < teacherList.size() - 1; i++) {
            Teacher min = teacherList.get(i);
            int minIndex = i;
            for (int j = i + 1; j < teacherList.size(); j++) {
                Teacher test = teacherList.get(j);
                if (min.getName().compareTo(test.getName()) > 0) {
                    min = test;
                    minIndex = j;
                }
                if (min.getName().compareTo(test.getName()) == 0) {
                    int compare = min.getCode().compareTo(teacherList.get(j).getCode());
                    if (compare > 0) {
                        min = teacherList.get(j);
                        minIndex = j;
                    }

                }
            }
            if (minIndex != i) {
                teacherList.set(minIndex, teacherList.get(i));
                teacherList.set(i, min);
            }
        }
    }
}
