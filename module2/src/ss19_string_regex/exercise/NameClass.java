package ss19_string_regex.exercise;

import java.util.Scanner;

public class NameClass {
    public static void main(String[] args) {
        System.out.println("nhập tên lớp vào đây");
        Scanner scanner = new Scanner(System.in);
        String nameClass = String.valueOf(scanner.nextLine());
        if (nameClass.matches("^[CAP][0-9]{4}[G-M]$")) {
            System.out.println("Tên lớp hợp lệ");
        } else {
            System.out.println("tên lớp không hợp lệ");
        }
    }
}
