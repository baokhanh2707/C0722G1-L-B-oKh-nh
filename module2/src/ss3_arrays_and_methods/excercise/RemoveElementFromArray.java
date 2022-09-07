package ss3_arrays_and_methods.excercise;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Scanner;

public class RemoveElementFromArray {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] array;
        int n;
        do {
            System.out.println("nhập vào số lượng phần tử của mảng");
            n = Integer.parseInt(scanner.nextLine());
            if (n <0) {
                System.out.println("bạn nhập sai , xin hãy nhập lại");
            }
        } while (n <0 );
        array = new int[n];
        for (int i = 0; i < array.length; i++) {
            System.out.println("nhập vào arr[%d]: " + i);
            array[i] = Integer.parseInt(scanner.nextLine());
        }
        System.out.println(Arrays.toString(array));
        System.out.print("nhập số cần kiểm tra");
        int number = scanner.nextInt();
        for (int i = 0; i < array.length; i++) {
            if (array[i] == (number)) {
                for (int j = i; j <array.length-1 ; j++) {
                    array[j]=array[j+1];
                }
                System.out.println(Arrays.toString(array));
            }
        }
    }
}

