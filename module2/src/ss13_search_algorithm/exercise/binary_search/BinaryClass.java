package ss13_search_algorithm.exercise.binary_search;

import java.util.*;

import static java.util.Collections.binarySearch;

public class BinaryClass {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Integer[] array;
        int n;
        do {
            System.out.println("nhập vào số lượng phần tử của mảng");
            n = Integer.parseInt(scanner.nextLine());
            if (n < 0) {
                System.out.println("bạn nhập sai , xin hãy nhập lại");
            }
        } while (n < 0);
        array = new Integer[n];
        for (int i = 0; i < array.length; i++) {
            System.out.println("nhập vào phần tử: " + i);
            array[i] = Integer.parseInt(scanner.nextLine());
        }
        List<Integer> list = Arrays.asList(array);
        Collections.sort(list);
        System.out.println(list);
        System.out.println("nhập số cần tìm");
        int number =Integer.parseInt(scanner.nextLine());
        int index=binarySearch(list,number,list.size()-1,0);
        System.out.println("vị trí index là"+index);
    }

    static int binarySearch(List<Integer> list, int k, int right, int left) {
        if (right > left) {
            int middle = (left + right) / 2;
            if (list.get(middle) == k) {
                return middle;
            }
            if (list.get(middle) < k) {
                return binarySearch(list, k, right - 1, left);
            } else {
                return binarySearch(list, k, right, left + 1);
            }
        }
        return -1;
    }
}