package ss11_dsa.exercise.element_inverse;
import java.util.Stack;

public class ReverseInteger {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        int[] arr = {1, 2, 3, 4, 5};
        for (int i = 0; i < arr.length; i++) {
            stack.push(arr[i]);
        }
        int number = stack.size();
        for (int i = 0; i < number; i++) {
            arr[i] = stack.pop();
            System.out.println("mảng sau khi thay đổi là "+  arr[i]);
        }
    }
}
