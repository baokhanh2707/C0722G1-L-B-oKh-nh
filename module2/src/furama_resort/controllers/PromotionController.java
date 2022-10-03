package furama_resort.controllers;

import java.util.Scanner;

public class PromotionController {
    private static Scanner scanner =new Scanner(System.in);
    public static void promotionMenu(){
        while (true){
            System.out.println("--------------------------");
            System.out.println("Nhập lựa chọn Menu của bạn");
            System.out.println("1.Display list customers use service");
            System.out.println("2.Display list customers get voucher");
            System.out.println("3.Return main menu");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice){
                case 1 :

                case 2 :

                case 3 :
                    FuramaController.displayMainMenu();
                    break;
                default:
                    System.out.println("Bạn nhập sai rồi !!!");
            }
        }
    }
}
