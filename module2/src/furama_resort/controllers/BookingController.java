package furama_resort.controllers;

import furama_resort.services.IBookingService;
import furama_resort.services.impl_booking.BookingService;

import java.util.Scanner;

public class BookingController {
    private static Scanner scanner = new Scanner(System.in);

    private static IBookingService iBookingService=new BookingService();
    public static void BookingMenu() {
        while (true) {
            try {
                System.out.println("--------------------------");
                System.out.println("BOOKING MENU");
                System.out.println("1.Add new booking");
                System.out.println("2.Display list booking");
                System.out.println("3.Create new constracts");
                System.out.println("4.Display list contracts");
                System.out.println("5.Edit contracts");
                System.out.println("6.Return main menu");
                int choice = Integer.parseInt(scanner.nextLine());
                switch (choice) {
                    case 1:
                        iBookingService.addBooking();
                        break;
                    case 2:
                        iBookingService.displayBooking();
                        break;
                    case 3:
                        iBookingService.createConstracts();
                        break;
                    case 4:
                        iBookingService.displayConstracts();
                        break;
                    case 5:
                        iBookingService.editConstracts();
                        break;
                    case 6:
                        FuramaController.displayMainMenu();
                        break;
                    default:
                        System.out.println("Bạn nhập sai rồi !!!!");
                }
            } catch (NumberFormatException e) {
                System.out.println(e.getMessage());

            }
        }
    }
}
