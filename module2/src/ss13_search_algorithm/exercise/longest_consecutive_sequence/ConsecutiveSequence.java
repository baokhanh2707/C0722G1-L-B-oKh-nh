package ss13_search_algorithm.exercise.longest_consecutive_sequence;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Scanner;

public class ConsecutiveSequence {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String test = scanner.nextLine();
        ArrayList<Character> array = new ArrayList<>();
        for (int i = 0; i < test.length(); i++) {
            LinkedList<Character> list = new LinkedList<>();
            list.add(test.charAt(i));
            for (int j = i + 1; j < test.length(); j++) {
                if (test.charAt(j) > list.getLast()) {
                    list.add(test.charAt(j));
                }else {
                    break;
                }
            }
            if (list.size() > array.size()) {
                array.clear();
                array.addAll(list);
            }
            list.clear();
        }
        for (Character character : array) {
            System.out.print(character);
        }
    }
}
