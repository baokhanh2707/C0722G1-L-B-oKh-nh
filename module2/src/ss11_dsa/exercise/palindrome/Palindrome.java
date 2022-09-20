package ss11_dsa.exercise.palindrome;

import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Scanner;
import java.util.Stack;

public class Palindrome {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();
        Queue<String> queue = new ArrayDeque<String>();
        System.out.println("bạn nhập chuỗi vào đây");
        Scanner scanner = new Scanner(System.in);
        String test = scanner.nextLine();
        for (int i = 0; i < test.length(); i++) {
            stack.push(test.charAt(i) + "");
            queue.offer(test.charAt(i) + "");
        }
        boolean check = false;
        for (int i = 0; i < test.length(); i++) {
            if (!stack.peek().equals(queue.peek())) {
                check = false;
            }else{
                check = true;
            }
        }if(check==true){
            System.out.println("chuỗi này là chuỗi palindrome");
        }else {
            System.out.println("chuỗi này k phải là chuỗi palindrome");
        }
    }
}
