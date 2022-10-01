package exercise_0.service.impl_teacher;

import exercise_0.model.Student;
import exercise_0.model.Teacher;
import exercise_0.service.ITeacherService;
import exercise_0.service.impl_student.Exception;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TeacherService implements ITeacherService {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Teacher> teacherList = new ArrayList<>();

    @Override
    public void addTeacher() throws IOException {
        List<Teacher> teacherList = getAllTeacherFromFile();
        Teacher teacher = infoTeacher();
        teacherList.add(teacher);
        System.out.println("Thêm mới thành công");
        writeFile(teacherList);
    }

    private List<Teacher> getAllTeacherFromFile() throws IOException {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\exercise_0\\data\\ReadTeacher.txt");
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        String line;
        List<Teacher> teacherList = new ArrayList<>();
        while ((line = bufferedReader.readLine()) != null) {
            String[] list = line.split(",");
            Teacher teacher = new Teacher(list[0], list[1], list[2], Boolean.getBoolean(list[3]), list[4]);
            teacherList.add(teacher);
        }
        bufferedReader.close();
        return teacherList;
    }

    private void writeFile(List<Teacher> teacherList) throws IOException {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\exercise_0\\data\\ReadTeacher.txt");
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));
        for (Teacher teacher : teacherList) {
            bufferedWriter.write(teacher.getInfor());
            bufferedWriter.newLine();
        }
        bufferedWriter.close();
    }


    @Override
    public void displayAllTeacher() throws IOException {
        teacherList = getAllTeacherFromFile();
        for (Teacher teacher : teacherList) {
            System.out.println(teacher.getInfor());
        }
    }

    public Teacher infoTeacher() {
        String code;
        while (true) {
            try {
                code = Exception.checkCode();
                break;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        String name;
        while (true) {
            try {
                name = Exception.checkName();
                break;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        String dateOfBirth;
        while (true) {
            try {
                dateOfBirth = Exception.checkdateOfBirth();
                break;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
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
        String specialize;
        while (true) {
            try {
                specialize = Exception.checkSpecialize();
                break;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
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
