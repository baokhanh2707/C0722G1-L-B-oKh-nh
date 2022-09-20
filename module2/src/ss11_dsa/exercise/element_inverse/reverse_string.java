package ss11_dsa.exercise.element_inverse;

import java.lang.reflect.Array;
import java.util.Scanner;
import java.util.Stack;

public class reverse_string {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();
        System.out.println("nhập chuỗi vào đây");
        Scanner scanner = new Scanner(System.in);
        String mWord =scanner.nextLine() ;
        for (int i = 0; i < mWord.length(); i++) {
            stack.push(mWord.charAt(i)+"");
        }
        for (int i = 0; i < mWord.length(); i++) {
            System.out.print(stack.pop());
        }
    }
}

