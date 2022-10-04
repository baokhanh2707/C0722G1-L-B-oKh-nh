package furama_resort.services.impl_customer;

import furama_resort.models.Customer;
import furama_resort.models.Employee;
import furama_resort.services.ICustomerService;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class CustomerService implements ICustomerService {
    Scanner scanner = new Scanner(System.in);
    List<Customer> customerList = new LinkedList<>();

    public Customer infoCustomer() {
        System.out.println("Mời bạn nhập mã khách hàng ");
        String code = scanner.nextLine();
        System.out.println("Mời bạn nhập tên khách hàng");
        String name = scanner.nextLine();
        System.out.println("Mời bạn nhập ngày sinh của khách hàng");
        String dayOfBirth = scanner.nextLine();
        System.out.println("Mời bạn nhập giới tính khách hàng");
        String gender = scanner.nextLine();
        System.out.println("Mời bạn nhập số CMND khách hàng");
        String idNumber = scanner.nextLine();
        System.out.println("Mời bạn nhập số điện thoại khách hàng");
        String phoneNumber = scanner.nextLine();
        System.out.println("Mời bạn nhập email khách hàng");
        String email = scanner.nextLine();
        System.out.println("Mời bạn nhập lựa chọn  loại khách");
        System.out.println("1.Diamond");
        System.out.println("2.Platinium");
        System.out.println("3.Gold");
        System.out.println("4.Silver");
        System.out.println("5.Member");
        String typeOfGuest ;
        int choice=Integer.parseInt(scanner.nextLine());
        switch (choice){
            case 1 :
                typeOfGuest="Diamond";
                break;
            case 2 :
                typeOfGuest="Platinium";
                break;
            case 3 :
                typeOfGuest="Gold";
                break;
            case 4 :
                typeOfGuest="Silver";
                break;
            case 5 :
                typeOfGuest="Member";
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + choice);
        }
        System.out.println("Mời bạn nhập địa chỉ của khách hàng");
        String address = scanner.nextLine();
        Customer customer = new Customer(code, name, dayOfBirth, gender, idNumber, phoneNumber, email, typeOfGuest, address);
        return customer;
    }

    @Override
    public void displayCustomer() {
        customerList=readLife();
        for (Customer customer : customerList) {
            System.out.println(customer);
        }
    }

    @Override
    public void addCustomer() {
        List<Customer>customerList=readLife();
        Customer customer = infoCustomer();
        customerList.add(customer);
        System.out.println("thêm mới thành công");
        writeLife(customerList);
    }

    @Override
    public void editCustomer() {
        customerList=readLife();
        System.out.println("mời bạn nhập mã khách hàng cần sửa");
        String code = scanner.nextLine();
        for (int i = 0; i < customerList.size(); i++) {
            if (customerList.get(i).getCode().equals(code)) {
                System.out.println("Mời bạn nhập tên mới của khách hàng ");
                String name = scanner.nextLine();
                customerList.get(i).setName(name);
                System.out.println("Mời bạn nhập ngày sinh mới của khách hàng");
                String dayOfBirth = scanner.nextLine();
                customerList.get(i).setDayOfBirth(dayOfBirth);
                System.out.println("Mời bạn nhập giới tính khách hàng ");
                String gender = scanner.nextLine();
                customerList.get(i).setGender(gender);
                System.out.println("Mời bạn nhập số CMND mới nhân viên");
                String idNumber = scanner.nextLine();
                customerList.get(i).setIdNumber(idNumber);
                System.out.println("Mời bạn nhập số điện thoại mới khách hàng");
                String phoneNumber = scanner.nextLine();
                customerList.get(i).setPhoneNumber(phoneNumber);
                System.out.println("Mời bạn nhập email mới của khách hàng");
                String email = scanner.nextLine();
                customerList.get(i).setEmail(email);
                System.out.println("Mời bạn nhập lựa chọn  loại khách mới");
                System.out.println("1.Diamond");
                System.out.println("2.Platinium");
                System.out.println("3.Gold");
                System.out.println("4.Silver");
                System.out.println("5.Member");
                String typeOfGuest ;
                int choice=Integer.parseInt(scanner.nextLine());
                switch (choice){
                    case 1 :
                        typeOfGuest="Diamond";
                        break;
                    case 2 :
                        typeOfGuest="Platinium";
                        break;
                    case 3 :
                        typeOfGuest="Gold";
                        break;
                    case 4 :
                        typeOfGuest="Silver";
                        break;
                    case 5 :
                        typeOfGuest="Member";
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + choice);
                }
                customerList.get(i).setTypeOfGuest(typeOfGuest);
                System.out.println("Mời bạn nhập địa chỉ khách hàng mới ");
                String address = scanner.nextLine();
                customerList.get(i).setAddress(address);
                System.out.println("Sửa đổi thành công");
            }
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
                Customer customer = new Customer(list[0],list[1],list[2],list[3],list[4],list[5],list[6],list[7],list[8]);
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
