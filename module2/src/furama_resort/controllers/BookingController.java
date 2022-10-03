package furama_resort.controllers;

import java.util.Scanner;

public class BookingController {
    private static  Scanner scanner = new Scanner(System.in);
    public static void BookingMenu(){
        while (true){
            System.out.println("--------------------------");
            System.out.println("BOOKING MENU");
            System.out.println("1.Add new booking");
            System.out.println("2.Display list booking");
            System.out.println("3.Create new constracts");
            System.out.println("4.Display list contracts");
            System.out.println("5.Edit contracts");
            System.out.println("6.Return main menu");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice){
                case 1 :

                case 2 :

                case 3 :

                case 4 :

                case 5 :

                case 6 :
                    FuramaController.displayMainMenu();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi !!!!");
            }
        }
    }
}
