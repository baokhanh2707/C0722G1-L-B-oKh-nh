package ss7_abstract_class_Interface.practice.interface_comparator_for_comparison;

import ss6_inheritance.practice.circle.Circle;

import java.util.Comparator;

public class CircleComparator  implements Comparator<Circle> {


    @Override
    public int compare(Circle c1, Circle c2) {
        if (c1.getRadius() > c2.getRadius()) return 1;
        else if (c1.getRadius() < c2.getRadius()) return -1;
        else return 0;
    }

//    @Override
//    public int compareTo(Circle o) {
//        return 0;
//    }
}
