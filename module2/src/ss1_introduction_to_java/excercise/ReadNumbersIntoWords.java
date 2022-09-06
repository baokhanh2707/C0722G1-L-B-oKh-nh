package ss1_introduction_to_java.excercise;

import java.util.Scanner;

public class ReadNumbersIntoWords {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("nhập số vào đây");
        int number = scanner.nextInt();
        if (number > 0 && number < 10) {
            switch (number) {
                case 1:
                    System.out.println("one");
                    break;
                case 2:
                    System.out.println("two");
                    break;
                case 3:
                    System.out.println("three");
                    break;
                case 4:
                    System.out.println("four");
                    break;
                case 5:
                    System.out.println("five");
                    break;
                case 6:
                    System.out.println("six");
                    break;
                case 7:
                    System.out.println("seven");
                    break;
                case 8:
                    System.out.println("eight");
                    break;
                case 9:
                    System.out.println("nine");
                    break;

            }
        } else if (number < 20) {
            switch (number % 10) {
                case 0:
                    System.out.println("ten");
                    break;
                case 1:
                    System.out.println("elevent");
                    break;
                case 2:
                    System.out.println("twelve");
                    break;
                case 3:
                    System.out.println("thirteen");
                    break;
                case 4:
                    System.out.println("fourteen");
                    break;
                case 5:
                    System.out.println("fifteen");
                    break;
                case 6:
                    System.out.println("sixteen");
                    break;
                case 7:
                    System.out.println("seventeen");
                    break;
                case 8:
                    System.out.println("eighteen");
                    break;
                case 9:
                    System.out.println("nineteen");
                    break;
            }
        } else if (number < 1000) {
            String hundred = "";
            String dozen = "";
            String unit = "";
            switch (number / 100) {
                case 1:
                    hundred = "one hundred";
                    break;
                case 2:
                    hundred = "two hundred";
                    break;
                case 3:
                    hundred = "three hundred";
                    break;
                case 4:
                    hundred = "four hundred";
                    break;
                case 5:
                    hundred = "five hundred";
                    break;
                case 6:
                    hundred = "six hundred";
                    break;
                case 7:
                    hundred = "seven hundred";
                    break;
                case 8:
                    hundred = "eight hundred";
                    break;
                case 9:
                    hundred = "nine hundred";
                    break;
            }
            int temp = (number % 100);
            if (temp < 20 && temp > 10) {
                switch (temp) {
                    case 11:
                        dozen = "elevent";
                        break;
                    case 12:
                        dozen = "twelve";
                        break;
                    case 13:
                        dozen = "thirteen";
                        break;
                    case 14:
                        dozen = "fourteen";
                        break;
                    case 15:
                        dozen = "fifteen";
                        break;
                    case 16:
                        dozen = "sixteen";
                        break;
                    case 17:
                        dozen = "seventeen";
                        break;
                    case 18:
                        dozen = "eighteen";
                        break;
                    case 19:
                        dozen = "nineteen";
                        break;
                }

            } else {
                switch ((number % 100) / 10) {
                    case 1:
                        dozen = "ten";
                        break;
                    case 2:
                        dozen = "twenty";
                        break;
                    case 3:
                        dozen = "thirty";
                        break;
                    case 4:
                        dozen = "fourty";
                        break;
                    case 5:
                        dozen = "fifty";
                        break;
                    case 6:
                        dozen = "sixty";
                        break;
                    case 7:
                        dozen = "seventy";
                        break;
                    case 8:
                        dozen = "eighty";
                        break;
                    case 9:
                        dozen = "ninety";
                        break;

                }
                switch ((number % 100) % 10) {
                    case 1:
                        unit = "one";
                        break;
                    case 2:
                        unit = "two";
                        break;
                    case 3:
                        unit = "three";
                        break;
                    case 4:
                        unit = "four";
                        break;
                    case 5:
                        unit = "five";
                        break;
                    case 6:
                        unit = "six";
                        break;
                    case 7:
                        unit = "seven";
                        break;
                    case 8:
                        unit = "eight";
                        break;
                    case 9:
                        unit = "nine";
                        break;
                }
            }
            System.out.printf("The  '%d' is %s ", number, hundred + dozen + unit);
        } else System.out.println("out of ability");
    }
}