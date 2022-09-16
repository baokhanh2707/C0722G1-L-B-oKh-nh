package ss10_dsa.practice.list;

import ss10_dsa.practice.list.List;

public class MyListTest {
    public static void main(String[] args) {
        List<Integer> list=new List<Integer>();
        list.add(4);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        System.out.println(list.get(4));

    }
}
