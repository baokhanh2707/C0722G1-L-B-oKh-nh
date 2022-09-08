package ss3_arrays_and_methods.excercise;

import java.util.Arrays;
import java.util.Scanner;

public class SumTheNumbersOnTheDiagonal {
    public static void main(String[] args) {
        int size;
        int size1;
        int sum = 0;
        Scanner scanner = new Scanner(System.in);
        System.out.println("nhập độ dài mảng");
        size = Integer.parseInt(scanner.nextLine());
        System.out.println("nhập độ dài mảng con");
        size1 = Integer.parseInt(scanner.nextLine());
        int[][] array = new int[size][size1];
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                System.out.println("nhập phần tử mảng con");
                array[i][j] = Integer.parseInt(scanner.nextLine());
            }
            System.out.println(Arrays.toString(array[i]));

        }
        for (int i = 0; i < array.length; i++) {
            sum += array[i][i];
        }
        System.out.println(sum);
        int sum1 = 0;
        for (int i = 0; i < array.length; i++) {
            sum1 += array[i][array[i].length - 1 - i];
        }
        System.out.println(sum1);

    }

}
