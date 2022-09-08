package ss3_arrays_and_methods.excercise;

import java.util.Scanner;

public class SumTheNumbersInASpecifiedColumn {
    public static void main(String[] args) {
        int[][] array = {{2, 4, 5, 6}, {5, 6, 7, 8}};
        int sum = 0;
        Scanner scanner = new Scanner(System.in);
        System.out.print("nhập số cột bạn muốn tính tổng");
        int number = scanner.nextInt();
        for (int i = 0; i < array.length; i++) {
            sum += array[i][number];
        }
        System.out.println(sum);
    }
}
