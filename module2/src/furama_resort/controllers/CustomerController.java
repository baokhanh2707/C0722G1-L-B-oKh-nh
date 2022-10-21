package furama_resort.controllers;

import furama_resort.services.ICustomerService;
import furama_resort.services.impl_customer.CustomerService;

import java.util.Scanner;

public class CustomerController {
    private static Scanner scanner = new Scanner(System.in);
    private static ICustomerService iCustomerService = new CustomerService();

    public static void customerMenu() {
        while (true) {
            try {
                System.out.println("----------------------");
                System.out.println("CUSTOMER MENU");
                System.out.println("nhập lựa chọn Menu của bạn");
                System.out.println("1.Display list customers");
                System.out.println("2.Add new customer");
                System.out.println("3.Edit customer");
                System.out.println("4.Return main menu");
                int choice = Integer.parseInt(scanner.nextLine());
                switch (choice) {
                    case 1:
                        iCustomerService.displayCustomer();
                        break;
                    case 2:
                        iCustomerService.addCustomer();
                        break;
                    case 3:
                        iCustomerService.editCustomer();
                        break;
                    case 4:
                        FuramaController.displayMainMenu();
                        break;
                    default:
                        System.out.println("Bạn nhập sai rồi !!!!");

                }
            } catch (NumberFormatException e) {
                System.out.println(e.getMessage());
            } catch (Exception e) {
                e.getMessage();
            }
        }
    }
}
