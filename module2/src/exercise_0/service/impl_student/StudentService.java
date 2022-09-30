package exercise_0.service.impl_student;

import exercise_0.model.Student;
import exercise_0.service.IStudentService;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StudentService implements IStudentService {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Student> studentList = new ArrayList<>();

    @Override
    public void removeStudent() {
        System.out.println("Nhập mã học sinh cần xóa: ");
        String code = scanner.nextLine();
        boolean flagDelete = false;
        for (int i = 0; i < studentList.size(); i++) {
            if (studentList.get(i).getCode().equals(code)) {
                System.out.println("Bạn muốn xóa học sinh này không ? Nhập Y: yes, N: no ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    studentList.remove(i);
                    System.out.println("Xóa thành công!");
                }
                flagDelete = true;
                break;
            }
        }
        if (!flagDelete) {
            System.out.println("Không tìm thấy học sinh cần xóa!");
        }
    }

    @Override
    public void searchByBiologicalId() {
        System.out.println("nhập vào mã học sinh cần tìm");
        String code = scanner.nextLine();
        for (int i = 0; i < studentList.size(); i++) {
            if (studentList.get(i).getCode().equals(code)) {
                System.out.println(studentList.get(i));
            }
        }
    }

    @Override
    public void searchByBiologicaName() {
        System.out.println("nhập vào tên học sinh cần tìm");
        String name = scanner.nextLine();
        for (int i = 0; i < studentList.size(); i++) {
            if (studentList.get(i).getName().contains(name)) {
                System.out.println(studentList.get(i));
            }
        }
    }

    @Override
    public void sortStudent() {
        for (int i = 0; i < studentList.size() - 1; i++) {
            Student min = studentList.get(i);
            int minIndex = i;
            for (int j = i + 1; j < studentList.size(); j++) {
                Student test = studentList.get(j);
                if (min.getName().compareTo(test.getName()) > 0) {
                    min = test;
                    minIndex = j;
                }
                if (min.getName().compareTo(test.getName()) == 0) {
                    int compare = min.getCode().compareTo(studentList.get(j).getCode());
                    if (compare > 0) {
                        min = studentList.get(j);
                        minIndex = j;
                    }

                }
            }
            if (minIndex != i) {
                studentList.set(minIndex, studentList.get(i));
                studentList.set(i, min);
            }
        }
    }

    @Override
    public void addStudent() throws IOException {
        List<Student> studentList= readFile();
        Student student = this.infoStudent();
        studentList.add(student);
        System.out.println("Thêm mới thành công");
        writeFile(studentList);
    }
    private List<Student> readFile() throws IOException {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\exercise_0\\data\\readStudent.txt");
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        String line;
        List<Student> studentList = new ArrayList<>();
        while ((line = bufferedReader.readLine()) != null) {
            String[] list = line.split(",");
            Student student = new Student(list[0], list[1],list[2],Boolean.getBoolean(list[3]),list[4],Double.parseDouble(list[5]));
            studentList.add(student);
        }
        bufferedReader.close();
        return studentList;
    }
    private void writeFile(List<Student>studentList)throws IOException{
        File file=new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\exercise_0\\data\\readStudent.txt");
        BufferedWriter bufferedWriter=new BufferedWriter(new FileWriter(file));
        for (Student student:studentList) {
            bufferedWriter.write(student.getInfor());
            bufferedWriter.newLine();
        }
        bufferedWriter.close();
    }
    public Student infoStudent() {
        System.out.println("Mời nhập mã học sinh: ");
        String code = scanner.nextLine();
        String name;
        while (true){
            try {
                System.out.println("mời nhập tên học sinh");
                name= scanner.nextLine();
                Exception.checkName(name);
                break;
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
        System.out.println("Mời nhập ngày sinh học sinh");
        String dateOfBirth = scanner.nextLine();
        System.out.println("Mời nhập giới tính học sinh: ");
        String tempGender = scanner.nextLine();
        Boolean gender;
        if (tempGender.equals("Nam")) {
            gender = true;
        } else if (tempGender.equals("Nữ")) {
            gender = false;
        } else {
            gender = null;
        }
        System.out.println("Mời bạn nhập tên lớp: ");
        String nameClass = scanner.nextLine();
        double score;
        while (true) {
            try {
                System.out.println("Mời bạn nhập điểm học sinh: ");
                score = Double.parseDouble(scanner.nextLine());
                break;
            } catch (NumberFormatException e) {
                System.out.println(e.getMessage());
            }
        }
        Student student = new Student(code, name, dateOfBirth, gender, nameClass, score);
        return student;
    }


    @Override
    public void displayAllStudent() throws IOException {
studentList = readFile();
        for (Student student : studentList) {
            System.out.println(student.getInfor());
        }
    }
}

