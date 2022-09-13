package ss6_inheritance.exercise.point_moveable_point.moveablePoints;

import java.util.Arrays;

public class CheckMoveablePoint {
    public static void main(String[] args) {
        MoveablePoint moveablePoint =new MoveablePoint();
//        System.out.println(moveablePoint);
        MoveablePoint moveablePoint1=new MoveablePoint(1,2,3,3);
//        System.out.println(moveablePoint1);
        System.out.println(moveablePoint1.move());
    }
}
