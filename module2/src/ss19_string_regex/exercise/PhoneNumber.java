package ss19_string_regex.exercise;

import java.util.Scanner;

public class PhoneNumber {
    public static void main(String[] args) {
        System.out.println("mời bạn nhập vào số điện thoại");
        Scanner scanner = new Scanner(System.in);
        String phoneNumber = String.valueOf(scanner.nextLine());

        if (phoneNumber.matches("^[(][0-9]{2}[)][-][(][0][0-9]{9}[)]$")) {
            System.out.println("số điện thoại hợp lệ");
        } else {
            System.out.println("số điện thoại không hợp lệ");
        }
    }
}
