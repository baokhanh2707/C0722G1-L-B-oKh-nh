package ss2_loop_in_java.excercise;

import java.util.Scanner;

public class Prime {
    public static void main(String[] args) {
        int number = 20;
        int count = 0;
        int prime = 2;
        while (count <= number) {
            int n = 0;
            for (int i = 2; i < prime; i++) {
                if (prime % i == 0) {
                    n = n + 1;
                }
            }
            if (n == 0) {
                System.out.println(prime);
                count++;
            }
            prime++;
        }
    }
}
