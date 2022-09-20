package ss11_dsa.exercise.count_occurrences;

import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class CountOccurrences {
    public static void main(String[] args) {
        Map<String, Integer> map = new TreeMap<>();
        Scanner scanner = new Scanner(System.in);
        System.out.println("mời bạn nhập một chuỗi vào đây");
        String string = scanner.nextLine().toLowerCase();
        String[] array = string.split(" ");
        for (String i : array) {
            if (map.containsKey(i)) {
                map.put(i, map.get(i) + 1);
            }else{
               map.put(i,1);
            }
        }
        System.out.println(map);
    }
}