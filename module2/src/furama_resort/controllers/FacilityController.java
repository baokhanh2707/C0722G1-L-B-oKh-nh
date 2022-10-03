package furama_resort.controllers;

import furama_resort.services.IFacilityService;
import furama_resort.services.impl_facility.FacilityService;

import java.util.Scanner;

public class FacilityController {
    private static Scanner scanner = new Scanner(System.in);
    private static IFacilityService iFacilityService = new FacilityService();

    public static void facilityMenu() {
        while (true) {
            System.out.println("-------------------------------");
            System.out.println("MENU FACILITY");
            System.out.println("Mời nhập lựa chọn của bạn");
            System.out.println("1.Display list facility");
            System.out.println("2.Add new facility");
            System.out.println("3.Display list facility maintenance");
            System.out.println("4.Return main menu");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    iFacilityService.displayFacility();
                    break;
                case 2:
                    iFacilityService.addFacility();
                    break;
                case 3:
                    iFacilityService.displayFacilityMaintenance();
                    break;
                case 4:
                    FuramaController.displayMainMenu();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi !!!!!");
            }
        }
    }
}
