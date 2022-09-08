package ss3_arrays_and_methods.excercise;

import java.util.Scanner;

public class NumberOfOccurrencesOfTheCharacter {
    public static void main(String[] args) {
        String name = "abccc";
        Scanner scanner = new Scanner(System.in);
        System.out.println("nhập 1 từ vào đây");
        char check = scanner.next().charAt(0);
        int count = 0;
        for (int i = 0; i < name.length(); i++) {
            if (check == name.charAt(i)) {
                count = count + 1;
            }
        }
        System.out.println("số lần xuất hiện là " + count);
    }
}
