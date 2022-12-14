package ss2_loop_in_java.excercise;

import com.sun.media.sound.RIFFInvalidDataException;
import com.sun.scenario.effect.impl.sw.java.JSWBlend_SRC_OUTPeer;

import java.lang.reflect.Array;
import java.util.Scanner;

public class ShowTypes {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int choice = -1;
        while (choice != 0) {
            System.out.println("Menu");
            System.out.println("1. Print the rectangle");
            System.out.println("2. Print the square triangle");
            System.out.println("3. Print isosceles triangle");
            System.out.println("4. Exit");
            System.out.println("Enter your choice: ");
            choice = input.nextInt();
            switch (choice) {
                case 1:
                    for (int i = 0; i < 3; i++) {
                        for (int j = 0; j < 7; j++) {
                            System.out.print("*");
                        }
                        System.out.println("");
                    }
                    break;
                case 2:
                    for (int i = 1; i < 8; i++) {
                        for (int j = 1; j < i; j++) {
                            System.out.print("*");
                        }
                        System.out.println("");
                    }
                    System.out.println("");
                for (int i = 5; i >= 1; i--) {
                    for (int j = 1; j <= i; j++) {
                        System.out.print("*");
                    }
                    System.out.println("");
                }
                    for (int i = 5; i >0 ; i--) {
                        for (int j = 1; j <i ; j++) {
                            System.out.print(" ");
                        }
                        for (int k = 5; k >=i ; k--) {
                            System.out.print("*");
                        }
                        System.out.println("");
                    }
                    System.out.println("");
                    for (int i = 5; i >0 && i<=5 ; i--) {
                        for (int j = 4; j >=i ; j--) {
                            System.out.print(" ");
                        }
                        for (int k = 1; k <=i ; k++) {
                            System.out.print("*");
                        }
                        System.out.println("");
                    }
                break;

                case 3:
                    System.out.println("nhập độ dài n");
                    Scanner scanner = new Scanner(System.in);
                    int n = scanner.nextInt();
                    for (int i = 0; i < n; i++) {
                        for (int j = 0; j <= i; j++) {
                            if (i == 0 || j == 0 || i == j || i == n-1) {
                                System.out.print("*");
                            }
                            else {
                                System.out.print(" ");
                            }
                        }
                        System.out.println();
                    }

                case 4:
                    System.exit(4);
                default:
                    System.out.println("No choice!");
            }
        }
    }
}
