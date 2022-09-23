package ss14_sort_algorithm.exercise.illustration_of_insertion_sort_algorithm;

import java.util.Arrays;
import java.util.Scanner;

public class InsertionSort {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("mời bạn nhập kích thước mảng");
        int size = scanner.nextInt();
        int[] list = new int[size];
        System.out.println("Enter " + list.length + " phần tử");
        for (int i = 0; i < list.length; i++) {
            list[i] = scanner.nextInt();
        }
        System.out.print("mảng chưa sắp xếp là: ");
        for (int i = 0; i < list.length; i++) {
            System.out.print(list[i] + " ");
        }
        System.out.println("\nBắt đầu xử lý sắp xếp...");
        insertionSort(list);
        System.out.println("Mảng sau khi được sắp xếp là: "+ Arrays.toString(list));
    }

    public static void insertionSort(int[] array) {
        int pos, x;
        for (int i = 1; i < array.length; i++) {
            x = array[i];
            System.out.println("Gán giá trị của x tại vị trí thứ " + i + ": x= " + array[i]);
            pos = i;
            System.out.println("Đặt pos ở vị trí thứ " + i);
            while (pos > 0 && x < array[pos - 1]) {
                array[pos] = array[pos - 1];
                System.out.println("Đổi chỗ " + pos + " với " + (pos - 1));
                pos--;
                System.out.println("Giảm poss 1 đơn vị");
            }
            array[pos] = x;
            System.out.println("Gán vị trí của " + array[pos] + " bằng " + x);
        }
    }
}

