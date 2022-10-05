package furama_resort.services.impl_employee;

import furama_resort.models.Employee;
import furama_resort.services.IEmployeeService;
import furama_resort.utils.Exceptions;


import java.io.*;
import java.text.NumberFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class EmployeeService implements IEmployeeService {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Employee> employeeList = new ArrayList<>();
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Employee infoEmployee() {
        String code;
        while (true) {
            try {
                System.out.println("Mời bạn nhập mã nhân viên ");
                code = scanner.nextLine();
                Exceptions.checkCode(code, "^[N][V][0-9]{1,3}$");
                for (int i = 0; i < employeeList.size(); i++) {
                    if (employeeList.get(i).getCode().equals(code)) {
                        throw new Exceptions("Mã nhân viên đã tồn tại");
                    }
                }
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            }

        }
        String name;
        while (true) {
            try {
                System.out.println("Mời bạn nhập tên nhân viên");
                name = scanner.nextLine();
                Exceptions.checkName(name, "^([A-ZĐ][a-záàảãạăẩâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$");
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        LocalDate dayOfBirth;
        while (true) {
            try {
                System.out.println("Mời bạn nhập ngày sinh của nhân viên");
                dayOfBirth = LocalDate.parse(scanner.nextLine(), formatter);
                Exceptions.checkAge(dayOfBirth);
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            } catch (DateTimeException e) {
                System.out.println("Bạn nhập không hợp lệ");
            }
        }
        String gender;
        while (true) {
            try {
                System.out.println("Mời bạn nhập giới tính nhân viên");
                gender = scanner.nextLine();
                Exceptions.checkGender(gender, "^(Nam|Nữ|Không|nam|nữ|không)+$");
                break;
            } catch (Exceptions exceptions) {
                exceptions.getMessage();
            }
        }
        String idNumber;
        while (true) {
            try {
                System.out.println("Mời bạn nhập số CMND nhân viên");
                idNumber = scanner.nextLine();
                Exceptions.checkIdNumber(idNumber);
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        String phoneNumber;
        while (true) {
            try {
                System.out.println("Mời bạn nhập số điện thoại nhân viên");
                phoneNumber = scanner.nextLine();
                Exceptions.checkPhoneNumber(phoneNumber);
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }

        String email;
        while (true) {
            try {
                System.out.println("Mời bạn nhập email nhân viên");
                email = scanner.nextLine();

                Exceptions.checkEmail(email);
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        String level;
        LOOP:
        while (true) {
            try {
                System.out.println("mời bạn nhập lựa chọn về Trình Độ của nhân viên ");
                System.out.println("1.Trung Cấp");
                System.out.println("2.Cao Đẳng");
                System.out.println("3.Đại Học");
                System.out.println("4.Sau Đại Học");
                int choice = Integer.parseInt(scanner.nextLine());
                switch (choice) {
                    case 1:
                        level = "Trung Cấp";
                        break LOOP;
                    case 2:
                        level = "Cao Đẳng";
                        break LOOP;
                    case 3:
                        level = "Đại Học";
                        break LOOP;
                    case 4:
                        level = "Sau Đại Học";
                        break LOOP;
                    default:
                        throw new IllegalStateException("Unexpected value: " + choice);
                }
            } catch (NumberFormatException e) {
                System.out.println("Mời bạn nhập lại");
            } catch (IllegalStateException e) {
                System.out.println("Mời bạn nhập lại");
            }
        }

        String location;
        int choice1;
        LOOP:
        while (true) {
            try {
                System.out.println("Mời bạn nhập lựa chọn về vị trí");
                System.out.println("1.Lễ Tân");
                System.out.println("2.Phục Vụ");
                System.out.println("3.Chuyên Môn");
                System.out.println("4.Giám Sát");
                System.out.println("5.Quản Lý");
                System.out.println("6.Giám Đốc");
                choice1 = Integer.parseInt(scanner.nextLine());
                switch (choice1) {
                    case 1:
                        location = "Lễ Tân";
                        break LOOP;
                    case 2:
                        location = "Phục Vụ";
                        break LOOP;
                    case 3:
                        location = "Chuyên Môn";
                        break LOOP;
                    case 4:
                        location = "Giám Sát";
                        break LOOP;
                    case 5:
                        location = "Quản Lý";
                        break LOOP;
                    case 6:
                        location = "Giám Đốc";
                        break LOOP;
                    default:
                        throw new IllegalStateException("Unexpected value: " + choice1);
                }
            } catch (NumberFormatException e) {
                System.out.println("Mời bạn nhập lại");
            } catch (IllegalStateException e) {
                System.out.println("Mời bạn nhập lại");
            }
        }
        String wage;
        while (true) {
            try {
                System.out.println("Mời bạn nhập lương nhân viên");
                wage = scanner.nextLine();
                Exceptions.checkWage(wage);
                break;
            } catch (Exceptions exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        Employee employee = new Employee(code, name, dayOfBirth, gender, idNumber, phoneNumber, email, level, location, wage);
        return employee;
    }

    @Override
    public void displayEmployee() {
        employeeList = readLife();
        for (Employee employee : employeeList) {
            System.out.println(employee);
        }
    }

    @Override
    public void addEmployee() {
        List<Employee> employeeList = readLife();
        Employee employee = this.infoEmployee();
        employeeList.add(employee);
        System.out.println("Thêm mới thành công");
        writeLife(employeeList);
    }

    @Override
    public void editEmployee() {
        employeeList = readLife();
        System.out.println("mời bạn nhập mã nhân viên cần sửa");
        String code = scanner.nextLine();
        boolean iscode = false;
        for (int i = 0; i < employeeList.size(); i++) {
            if (employeeList.get(i).getCode().equals(code)) {

                String name;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập tên nhân viên mới");
                        name = scanner.nextLine();
                        Exceptions.checkName(name, "^([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$");
                        break;
                    } catch (Exceptions exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                employeeList.get(i).setName(name);

                LocalDate dayOfBirth;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập ngày sinh mới của nhân viên");
                        dayOfBirth = LocalDate.parse(scanner.nextLine(), formatter);
                        Exceptions.checkAge(dayOfBirth);
                        break;
                    } catch (Exceptions exceptions) {
                        System.out.println(exceptions.getMessage());
                    } catch (DateTimeException e) {
                        System.out.println("Bạn nhập không hợp lệ");
                    }
                }
                employeeList.get(i).setDayOfBirth(dayOfBirth);

                String gender;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập giới tính nhân viên mới");
                        gender = scanner.nextLine();
                        Exceptions.checkGender(gender, "^(Nam|Nữ|Không|nam|nữ|không)+$");
                        break;
                    } catch (Exceptions exceptions) {
                        exceptions.getMessage();
                    }
                }
                employeeList.get(i).setGender(gender);

                String idNumber;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập số CMND nhân viên mới");
                        idNumber = scanner.nextLine();
                        Exceptions.checkIdNumber(idNumber);
                        break;
                    } catch (Exceptions exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                employeeList.get(i).setIdNumber(idNumber);

                String phoneNumber;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập số điện thoại nhân viên mới");
                        phoneNumber = scanner.nextLine();
                        Exceptions.checkPhoneNumber(phoneNumber);
                        break;
                    } catch (Exceptions exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                employeeList.get(i).setPhoneNumber(phoneNumber);

                String email;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập email mới của nhân viên ");
                        email = scanner.nextLine();
                        Exceptions.checkEmail(email);
                        break;
                    } catch (Exceptions exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                employeeList.get(i).setEmail(email);

                String level;
                LOOP:
                while (true) {
                    try {
                        System.out.println("mời bạn nhập lựa chọn về Trình Độ mới của nhân viên ");
                        System.out.println("1.Trung Cấp");
                        System.out.println("2.Cao Đẳng");
                        System.out.println("3.Đại Học");
                        System.out.println("4.Sau Đại Học");
                        int choice = Integer.parseInt(scanner.nextLine());
                        switch (choice) {
                            case 1:
                                level = "Trung Cấp";
                                break LOOP;
                            case 2:
                                level = "Cao Đẳng";
                                break LOOP;
                            case 3:
                                level = "Đại Học";
                                break LOOP;
                            case 4:
                                level = "Sau Đại Học";
                                break LOOP;
                            default:
                                throw new IllegalStateException("Unexpected value: " + choice);
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Mời bạn nhập lại");
                    } catch (IllegalStateException e) {
                        System.out.println("Mời bạn nhập lại");
                    }
                }
                employeeList.get(i).setLevel(level);

                String location;
                int choice1;
                LOOP:
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập lựa chọn mới về vị trí");
                        System.out.println("1.Lễ Tân");
                        System.out.println("2.Phục Vụ");
                        System.out.println("3.Chuyên Môn");
                        System.out.println("4.Giám Sát");
                        System.out.println("5.Quản Lý");
                        System.out.println("6.Giám Đốc");
                        choice1 = Integer.parseInt(scanner.nextLine());
                        switch (choice1) {
                            case 1:
                                location = "Lễ Tân";
                                break LOOP;
                            case 2:
                                location = "Phục Vụ";
                                break LOOP;
                            case 3:
                                location = "Chuyên Môn";
                                break LOOP;
                            case 4:
                                location = "Giám Sát";
                                break LOOP;
                            case 5:
                                location = "Quản Lý";
                                break LOOP;
                            case 6:
                                location = "Giám Đốc";
                                break LOOP;
                            default:
                                throw new IllegalStateException("Unexpected value: " + choice1);
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Mời bạn nhập lại");
                    } catch (IllegalStateException e) {
                        System.out.println("Mời bạn nhập lại");
                    }
                }
                employeeList.get(i).setLocation(location);

                String wage;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập lương mới của nhân viên");
                        wage = scanner.nextLine();
                        Exceptions.checkWage(wage);
                        break;
                    } catch (Exceptions exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                employeeList.get(i).setWage(wage);
                System.out.println("Sửa đổi thành công");
                iscode = true;
                break;
            }
        }
        if (!iscode) {
            System.out.println("không tìm thấy mã cần tìm");
        }
        writeLife(employeeList);
    }

    private List<Employee> readLife() {
        List<Employee> employeeList = new ArrayList<>();
        BufferedReader bufferedReader = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\employee.txt");
            FileReader fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line;
            String[] list;
            while ((line = bufferedReader.readLine()) != null) {
                list = line.split(",");
                Employee employee = new Employee(list[0], list[1], LocalDate.parse(list[2]), list[3], list[4], list[5],
                        list[6], list[7], list[8], list[9]);
                employeeList.add(employee);
            }
        } catch (FileNotFoundException e) {
            e.getMessage();
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

    public void writeLife(List<Employee> employeeList) {
        BufferedWriter bufferedWriter = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\employee.txt");
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            for (Employee employee : employeeList) {
                bufferedWriter.write(getInfor(employee));
                bufferedWriter.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String getInfor(Employee employee) {
        return employee.getCode() + "," + employee.getName() + "," + employee.getDayOfBirth() + "," + employee.getGender() + "," + employee.getIdNumber() + "," + employee.getPhoneNumber() + "," + employee.getEmail() + "," + employee.getLevel() + "," + employee.getLocation() + "," + employee.getWage();
    }
}