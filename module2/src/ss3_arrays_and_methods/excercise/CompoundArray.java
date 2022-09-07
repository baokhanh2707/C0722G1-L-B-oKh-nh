package ss3_arrays_and_methods.excercise;

import java.util.Arrays;
import java.util.Scanner;

public class CompoundArray {
        public static void main (String[]args){
            int[] arrays1 = new int[2];
            int[] arrays2 = new int[3];
            int[] arrays3 = new int[5];
            Scanner scanner = new Scanner(System.in);
            for (int i = 0; i < arrays1.length; i++) {
                System.out.println("Array 1: phần tử  " + (i + 1));
                arrays1[i] = Integer.parseInt(scanner.nextLine());
            }
            for (int i = 0; i < arrays2.length; i++) {
                System.out.println("Array 2: phần tử " + (i + 1));
                arrays2[i] = Integer.parseInt(scanner.nextLine());
            }
            System.out.println(Arrays.toString(arrays1));
            System.out.println(Arrays.toString(arrays2));
            for (int i = 0; i < arrays1.length; i++) {
                arrays3[i] = arrays1[i];
            }
            for (int i = 0; i < arrays2.length; i++) {
                arrays3[arrays1.length + i] = arrays2[i];
            }
            System.out.println(Arrays.toString(arrays3));
        }
    }

