package ss1_introduction_to_java.excercise;

import java.util.Scanner;

public class CurrencyConversion {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("nhập số tiền cần đổi");
        int vnd = 23000;
        int usd;
        usd = scanner.nextInt();
        int quyDoi = usd * vnd;
        System.out.println("giá trị vnd là " + quyDoi);
    }
}
