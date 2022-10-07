package furama_resort.controllers;

import furama_resort.services.IFacilityService;
import furama_resort.services.impl_facility.FacilityService;

import java.util.Scanner;

public class FacilityController {
    private static Scanner scanner = new Scanner(System.in);
    private static IFacilityService iFacilityService = new FacilityService();

    public static void facilityMenu() {
        while (true) {
            try {
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
                        addFacility();
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

            } catch (NumberFormatException e) {
                System.out.println(e.getMessage());
            }
        }

    }

    public static void addFacility() {
        LOOP:
        while (true) {
            try {
                System.out.println("-----------------------------------");
                System.out.println("Mời bạn nhập lựa chọn muốn thêm mới");
                System.out.println("1.Add New Villa");
                System.out.println("2.Add New House");
                System.out.println("3.Add New Room");
                System.out.println("4.Back to menu");
                int choice = Integer.parseInt(scanner.nextLine());
                switch (choice) {
                    case 1:
                        iFacilityService.addVilla();
                        break;
                    case 2:
                        iFacilityService.addHouse();
                        break;
                    case 3:
                        iFacilityService.addRoom();
                        break;
                    case 4:
                        break LOOP;
                    default:
                        System.out.println("Bạn nhập sai rồi !!!!!");
                }
            } catch (NumberFormatException e) {
                System.out.println(e.getMessage());
            }
        }

    }
}