package ss1_introduction_to_java.excercise;

import java.util.Scanner;

public class ShowGreetings {
    public static void main(String[] args) {
        Scanner scanner =  new Scanner(System.in);
        System.out.println("Enter your name: ");
       String name =scanner.next();
       System.out.println("Hello :"+name);
    }
}
