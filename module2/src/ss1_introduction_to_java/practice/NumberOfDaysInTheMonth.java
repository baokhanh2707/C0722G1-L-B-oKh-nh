package ss1_introduction_to_java.practice;

import java.util.Scanner;

public class NumberOfDaysInTheMonth {
    public static void main(String[] args) {
       Scanner scanner = new Scanner(System.in);
        System.out.println("nhập tháng vào đây  ");
        int month = scanner.nextInt();
        String dayOfMonths;
        switch (month) {
            case 2:
                dayOfMonths = "28 or 29";
                break;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                dayOfMonths = "31";
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                dayOfMonths = "30";
                break;
            default:
                dayOfMonths = "";
        }

        if (!dayOfMonths.equals("")) System.out.printf("The month '%d' has %s days!", month, dayOfMonths);
        else System.out.print("Invalid input!");
    }
}
