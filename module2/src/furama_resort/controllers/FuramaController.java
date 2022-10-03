package furama_resort.controllers;

import furama_resort.services.impl_employee.EmployeeService;

import java.util.Scanner;

public class FuramaController {
    private static Scanner scanner=new Scanner(System.in);
    public static void displayMainMenu(){
        while (true){
            System.out.println("FURAMA MENU");
            System.out.println("------------------------------------");
            System.out.println("Nhập lựa chọn Menu của bạn");
            System.out.println("1.Employee Management");
            System.out.println("2.Customer Management");
            System.out.println("3.Facility Management");
            System.out.println("4.Booking Management");
            System.out.println("5.Promotion Management");
            System.out.println("6.Exit");
            int choice=Integer.parseInt(scanner.nextLine());
            switch (choice){
                case 1 :
                    EmployeeController.employeeMenu();
                    break;
                case 2 :
                    CustomerController.customerMenu();
                    break;
                case 3 :
                    FacilityController.facilityMenu();
                    break;
                case 4 :
                    BookingController.BookingMenu();
                    break;
                case 5 :
                    PromotionController.promotionMenu();
                    break;
                case 6 :
                    System.exit(0);
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi !!!");
            }

        }
    }
}
