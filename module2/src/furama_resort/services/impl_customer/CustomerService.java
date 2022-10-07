package furama_resort.services.impl_customer;

import furama_resort.models.Customer;
import furama_resort.services.ICustomerService;
import furama_resort.utils.ExceptionPerson;

import java.io.*;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class CustomerService implements ICustomerService {
    Scanner scanner = new Scanner(System.in);
    List<Customer> customerList = new LinkedList<>();
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public Customer infoCustomer() {
        String code;
        while (true) {
            try {
                System.out.println("Mời bạn nhập mã khách hàng ");
                code = scanner.nextLine();
                ExceptionPerson.checkCode(code, "^[K][H][0-9]{1,3}$");
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        String name;
        while (true) {
            try {
                System.out.println("Mời bạn nhập tên khách hàng");
                name = scanner.nextLine();
                ExceptionPerson.checkName(name, "^([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$");
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }

        LocalDate dayOfBirth;
        while (true) {
            try {
                System.out.println("Mời bạn nhập ngày sinh  của khách hàng");
                dayOfBirth = LocalDate.parse(scanner.nextLine(), formatter);
                ExceptionPerson.checkAge(dayOfBirth);
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            } catch (DateTimeException e) {
                System.out.println("Bạn nhập không hợp lệ");
            }
        }

        String gender;
        while (true) {
            try {
                System.out.println("Mời bạn nhập giới tính khách hàng");
                gender = scanner.nextLine();
                ExceptionPerson.checkGender(gender, "^(Nam|Nữ|Không|nam|nữ|không)+$");
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        String idNumber;
        while (true) {
            try {
                System.out.println("Mời bạn nhập số CMND khách hàng");
                idNumber = scanner.nextLine();
                ExceptionPerson.checkIdNumber(idNumber);
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }

        String phoneNumber;
        while (true) {
            try {
                System.out.println("Mời bạn nhập số điện thoại khách hàng");
                phoneNumber = scanner.nextLine();
                ExceptionPerson.checkPhoneNumber(phoneNumber);
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        String email;
        while (true) {
            try {
                System.out.println("Mời bạn nhập email khách hàng");
                email = scanner.nextLine();
                ExceptionPerson.checkEmail(email);
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        String typeOfGuest;
        LOOP:
        while (true) {
            try {
                System.out.println("Mời bạn nhập lựa chọn  loại khách");
                System.out.println("1.Diamond");
                System.out.println("2.Platinium");
                System.out.println("3.Gold");
                System.out.println("4.Silver");
                System.out.println("5.Member");
                int choice = Integer.parseInt(scanner.nextLine());
                switch (choice) {
                    case 1:
                        typeOfGuest = "Diamond";
                        break LOOP;
                    case 2:
                        typeOfGuest = "Platinium";
                        break LOOP;
                    case 3:
                        typeOfGuest = "Gold";
                        break LOOP;
                    case 4:
                        typeOfGuest = "Silver";
                        break LOOP;
                    case 5:
                        typeOfGuest = "Member";
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
        String address;
        while (true) {
            try {
                System.out.println("Mời bạn nhập địa chỉ của khách hàng");
                address = scanner.nextLine();
                ExceptionPerson.checkAddress(address);
                break;
            } catch (ExceptionPerson exceptions) {
                System.out.println(exceptions.getMessage());
            }
        }
        Customer customer = new Customer(code, name, dayOfBirth, gender, idNumber, phoneNumber, email, typeOfGuest, address);
        return customer;
    }

    @Override
    public void displayCustomer() {
        customerList = readLife();
        for (Customer customer : customerList) {
            System.out.println(customer);
        }
    }

    @Override
    public void addCustomer() {
        List<Customer> customerList = readLife();
        Customer customer = infoCustomer();
        customerList.add(customer);
        System.out.println("thêm mới thành công");
        writeLife(customerList);
    }

    @Override
    public void editCustomer() {
        customerList = readLife();
        System.out.println("mời bạn nhập mã khách hàng cần sửa");
        String code = scanner.nextLine();
        boolean iscode = false;
        for (int i = 0; i < customerList.size(); i++) {
            if (customerList.get(i).getCode().equals(code)) {

                String name;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập tên mới khách hàng");
                        name = scanner.nextLine();
                        ExceptionPerson.checkName(name, "^([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$");
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                customerList.get(i).setName(name);

                LocalDate dayOfBirth;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập ngày sinh mới của khách hàng");
                        dayOfBirth = LocalDate.parse(scanner.nextLine(), formatter);
                        ExceptionPerson.checkAge(dayOfBirth);
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    } catch (DateTimeException e) {
                        System.out.println("Bạn nhập không hợp lệ");
                    }
                }
                customerList.get(i).setDayOfBirth(dayOfBirth);

                String gender;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập giới tính mới của khách hàng");
                        gender = scanner.nextLine();
                        ExceptionPerson.checkGender(gender, "^(Nam|Nữ|Không|nam|nữ|không)+$");
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                customerList.get(i).setGender(gender);

                String idNumber;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập số CMND mới khách hàng");
                        idNumber = scanner.nextLine();
                        ExceptionPerson.checkIdNumber(idNumber);
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                customerList.get(i).setIdNumber(idNumber);

                String phoneNumber;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập số điện thoại mới của khách hàng");
                        phoneNumber = scanner.nextLine();
                        ExceptionPerson.checkPhoneNumber(phoneNumber);
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                customerList.get(i).setPhoneNumber(phoneNumber);

                String email;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập email mới khách hàng");
                        email = scanner.nextLine();
                        ExceptionPerson.checkEmail(email);
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                customerList.get(i).setEmail(email);

                String typeOfGuest;
                LOOP:
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập lựa chọn  loại khách mới");
                        System.out.println("1.Diamond");
                        System.out.println("2.Platinium");
                        System.out.println("3.Gold");
                        System.out.println("4.Silver");
                        System.out.println("5.Member");
                        int choice = Integer.parseInt(scanner.nextLine());
                        switch (choice) {
                            case 1:
                                typeOfGuest = "Diamond";
                                break LOOP;
                            case 2:
                                typeOfGuest = "Platinium";
                                break LOOP;
                            case 3:
                                typeOfGuest = "Gold";
                                break LOOP;
                            case 4:
                                typeOfGuest = "Silver";
                                break LOOP;
                            case 5:
                                typeOfGuest = "Member";
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
                customerList.get(i).setTypeOfGuest(typeOfGuest);

                String address;
                while (true) {
                    try {
                        System.out.println("Mời bạn nhập địa chỉ của khách hàng");
                        address = scanner.nextLine();
                        ExceptionPerson.checkAddress(address);
                        break;
                    } catch (ExceptionPerson exceptions) {
                        System.out.println(exceptions.getMessage());
                    }
                }
                customerList.get(i).setAddress(address);
                System.out.println("Sửa đổi thành công");
                iscode = true;
                break;
            }
        }
        if (!iscode) {
            System.out.println("không tìm thấy mã cần tìm");
        }
        writeLife(customerList);
    }

    private List<Customer> readLife() {
        List<Customer> customerList = new ArrayList<>();
        BufferedReader bufferedReader = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\customer.txt");
            FileReader fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] list = line.split(",");
                Customer customer = new Customer(list[0], list[1], LocalDate.parse(list[2]), list[3], list[4], list[5], list[6], list[7], list[8]);
                customerList.add(customer);
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
        return customerList;
    }

    public void writeLife(List<Customer> customerList) {
        BufferedWriter bufferedWriter = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\customer.txt");
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            for (Customer customer : customerList) {
                bufferedWriter.write(getInfor(customer));
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

    private String getInfor(Customer customer) {
        return customer.getCode() + "," + customer.getName() + "," + customer.getDayOfBirth() + "," + customer.getGender() + "," + customer.getIdNumber() + "," + customer.getPhoneNumber() + "," + customer.getEmail() + "," + customer.getTypeOfGuest() + "," + customer.getAddress();
    }
}
