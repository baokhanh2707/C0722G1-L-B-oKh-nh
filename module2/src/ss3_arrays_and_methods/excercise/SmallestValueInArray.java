package ss3_arrays_and_methods.excercise;

import java.util.Scanner;

public class SmallestValueInArray {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] array;
        int n;
        do {
            System.out.println("nhập vào số lượng phần tử của mảng");
            n = Integer.parseInt(scanner.nextLine());
            if (n < 0) {
                System.out.println("bạn nhập sai , xin hãy nhập lại");
            }
        } while (n < 0);
        array = new int[n];
        for (int i = 0; i < array.length; i++) {
            System.out.println("nhập vào arr[%d]: " + i);
            array[i] = Integer.parseInt(scanner.nextLine());
        }
        int min = array[0];
        for (int i = 0; i < array.length; i++) {
            if (min > array[i]) {
                min = array[i];

            }
        }
        System.out.println("số nhỏ nhất là " + min);
    }
}
