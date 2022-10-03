package furama_resort.controllers;

import furama_resort.services.IEmployeeService;
import furama_resort.services.impl_employee.EmployeeService;

import java.util.Scanner;

public class EmployeeController {
    private static Scanner scanner = new Scanner(System.in);
    private static IEmployeeService iEmployeeService = new EmployeeService();
    public static void employeeMenu() {
        while (true) {
            System.out.println("----------------------------");
            System.out.println("MENU EMPLOYEE");
            System.out.println("Nhập lựa chọn menu của bạn");
            System.out.println("1.Display list employees");
            System.out.println("2.Add new employee");
            System.out.println("3.Edit employee");
            System.out.println("4.Return main menu");
            int choice =Integer.parseInt(scanner.nextLine());
            switch (choice){
                case 1 :
                    iEmployeeService.displayEmployee();
                    break;
                case 2 :
                    iEmployeeService.addEmployee();
                    break;
                case 3 :
                    iEmployeeService.editEmployee();
                    break;
                case 4 :
                    FuramaController.displayMainMenu();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi !!!!");
            }
        }
    }
}