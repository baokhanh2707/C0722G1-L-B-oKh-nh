package ss3_arrays_and_methods.excercise;

import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.Scanner;

public class AddElementToArray {
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
            System.out.println("nhập vào phần tử: " + i);
            array[i] = Integer.parseInt(scanner.nextLine());
        }
        System.out.println(Arrays.toString(array));

        System.out.print("nhập số cần chèn");
        int x = Integer.parseInt(scanner.nextLine());

        System.out.print("nhập vào vị trí cần chèn");
        int index = Integer.parseInt(scanner.nextLine());
        if (index < 0 || index > array.length - 1) {
            System.out.println("không chèn vào mảng được");
        } else {

            for (int j = array.length - 1; j > index; j--) {
                array[j] = array[j - 1];
            }
            array[index] = index;
        }
        System.out.println("kết quả sau khi chèn: ");
        System.out.println(Arrays.toString(array));
    }
}

