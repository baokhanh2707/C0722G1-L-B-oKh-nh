package ss11_dsa.exercise.decimal_to_binary;

import java.util.Scanner;
import java.util.Stack;

public class DecimalToBinary {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        Scanner scanner = new Scanner(System.in);
        System.out.println("nhập số thập phân vào đây");
        int decimal = Integer.parseInt(scanner.nextLine());
        for (int i = 0; i < decimal; i++) {
            while (decimal > 0) {
                int surplus = decimal % 2;
                stack.push(surplus);
                decimal = decimal / 2;
            }int size=stack.size();
            for (int j = 0; j < size; j++) {
                System.out.print(stack.pop());
            }

        }

    }
}