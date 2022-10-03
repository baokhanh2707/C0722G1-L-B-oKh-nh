package furama_resort.services.impl_employee;

import furama_resort.models.Employee;
import furama_resort.services.IEmployeeService;


import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class EmployeeService implements IEmployeeService {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Employee> employeeList = new ArrayList<>();

    public Employee infoEmployee() {
        System.out.println("Mời bạn nhập mã nhân viên ");
        String code = scanner.nextLine();
        System.out.println("Mời bạn nhập tên nhân viên");
        String name = scanner.nextLine();
        System.out.println("Mời bạn nhập ngày sinh của nhân viên");
        String dayOfBirth = scanner.nextLine();
        System.out.println("Mời bạn nhập giới tính nhân viên");
        String gender = scanner.nextLine();
        System.out.println("Mời bạn nhập số CMND nhân viên");
        int idNumber = Integer.parseInt(scanner.nextLine());
        System.out.println("Mời bạn nhập số điện thoại nhân viên");
        int phoneNumber = Integer.parseInt(scanner.nextLine());
        System.out.println("Mời bạn nhập email nhân viên");
        String email = scanner.nextLine();
        System.out.println("mời bạn nhập lựa chọn về Trình Độ của nhân viên ");
        System.out.println("1.Trung Cấp");
        System.out.println("2.Cao Đẳng");
        System.out.println("3.Đại Học");
        System.out.println("4.Sau Đại Học");
        String level;
        int choice = Integer.parseInt(scanner.nextLine());
        switch (choice) {
            case 1:
                level = "Trung Cấp";
                break;
            case 2:
                level = "Cao Đẳng";
                break;
            case 3:
                level = "Đại Học";
                break;
            case 4:
                level = "Sau Đại Học";
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + choice);
        }
        String location;
        System.out.println("Mời bạn nhập lựa chọn về vị trí");
        System.out.println("1.Lễ Tân");
        System.out.println("2.Phục Vụ");
        System.out.println("3.Chuyên Môn");
        System.out.println("4.Giám Sát");
        System.out.println("5.Quản Lý");
        System.out.println("6.Giám Đốc");
        int choice1 = Integer.parseInt(scanner.nextLine());
        switch (choice1) {
            case 1:
                location = "Lễ Tân";
                break;
            case 2:
                location = "Phục Vụ";
                break;
            case 3:
                location = "Chuyên Môn";
                break;
            case 4:
                location = "Giám Sát";
                break;
            case 5:
                location = "Quản Lý";
                break;
            case 6:
                location = "Giám Đốc";
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + choice1);
        }
        System.out.println("Mời bạn nhập lương nhân viên");
        double wage = Double.parseDouble(scanner.nextLine());
        Employee employee = new Employee(code, name, dayOfBirth, gender, idNumber, phoneNumber, email, level, location, wage);
        return employee;
    }

    @Override
    public void displayEmployee() {
        for (Employee employee : employeeList) {
            System.out.println(employee);
        }
    }

    @Override
    public void addEmployee() {
        Employee employee = this.infoEmployee();
        employeeList.add(employee);
        System.out.println("Thêm mới thành công");
    }

    @Override
    public void editEmployee() {
        System.out.println("mời bạn nhập mã nhân viên cần sửa");
        String code = scanner.nextLine();
        for (int i = 0; i < employeeList.size(); i++) {
            if (employeeList.get(i).getCode().equals(code)) {
                System.out.println("Mời bạn nhập tên mới của nhân viên ");
                String name = scanner.nextLine();
                employeeList.get(i).setName(name);
                System.out.println("Mời bạn nhập ngày sinh mới của nhân viên");
                String dayOfBirth = scanner.nextLine();
                employeeList.get(i).setDayOfBirth(dayOfBirth);
                System.out.println("Mời bạn nhập giới tính nhân viên ");
                String gender = scanner.nextLine();
                employeeList.get(i).setGender(gender);
                System.out.println("Mời bạn nhập số CMND mới nhân viên");
                int idNumber = Integer.parseInt(scanner.nextLine());
                employeeList.get(i).setIdNumber(idNumber);
                System.out.println("Mời bạn nhập số điện thoại mới nhân viên");
                int phoneNumber = Integer.parseInt(scanner.nextLine());
                employeeList.get(i).setPhoneNumber(phoneNumber);
                System.out.println("Mời bạn nhập email mới của nhân viên");
                String email = scanner.nextLine();
                employeeList.get(i).setEmail(email);
                System.out.println("mời bạn nhập lựa chọn về Trình Độ của nhân viên mới ");
                System.out.println("1.Trung Cấp");
                System.out.println("2.Cao Đẳng");
                System.out.println("3.Đại Học");
                System.out.println("4.Sau Đại Học");
                String level;
                int choice = Integer.parseInt(scanner.nextLine());
                switch (choice) {
                    case 1:
                        level = "Trung Cấp";
                        break;
                    case 2:
                        level = "Cao Đẳng";
                        break;
                    case 3:
                        level = "Đại Học";
                        break;
                    case 4:
                        level = "Sau Đại Học";
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + choice);
                }
                employeeList.get(i).setLevel(level);
                String location;
                System.out.println("Mời bạn nhập lựa chọn về vị trí mới");
                System.out.println("1.Lễ Tân");
                System.out.println("2.Phục Vụ");
                System.out.println("3.Chuyên Môn");
                System.out.println("4.Giám Sát");
                System.out.println("5.Quản Lý");
                System.out.println("6.Giám Đốc");
                int choice1 = Integer.parseInt(scanner.nextLine());
                switch (choice1) {
                    case 1:
                        location = "Lễ Tân";
                        break;
                    case 2:
                        location = "Phục Vụ";
                        break;
                    case 3:
                        location = "Chuyên Môn";
                        break;
                    case 4:
                        location = "Giám Sát";
                        break;
                    case 5:
                        location = "Quản Lý";
                        break;
                    case 6:
                        location = "Giám Đốc";
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + choice1);
                }
                employeeList.get(i).setLocation(location);
                System.out.println("Mời bạn nhập lương mới của nhân viên");
                double wage = Double.parseDouble(scanner.nextLine());
                employeeList.get(i).setWage(wage);
                System.out.println("Sửa đổi thành công");
            }
        }

    }


    private List<Employee> readLife() {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\employee.txt");
        BufferedReader bufferedReader = null;

        try {
            FileReader fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line;
            List<Employee> employeeList = new ArrayList<>();
            while ((line = bufferedReader.readLine()) != null) {
                String[] list = line.split(",");
                Employee employee = new Employee(list[0], list[1], list[2], list[3], Integer.parseInt(list[4]), Integer.parseInt(list[5]),
                        list[6], list[7], list[8], Double.parseDouble(list[9]));
                employeeList.add(employee);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return employeeList;
    }

    public void writeLife(List<Employee>employeeList) {

        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\employee.txt");
        BufferedWriter bufferedWriter = null;
        try {
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            for (Employee employee : employeeList) {
                bufferedWriter.write(employee.getInfor());
                bufferedWriter.newLine();
            }
            try {
                bufferedWriter.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
