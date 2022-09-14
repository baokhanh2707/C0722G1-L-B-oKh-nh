package ss7_abstract_class_Interface.exercise.resizeable;

import ss7_abstract_class_Interface.exercise.colorable.Geometry;

public class Main {
    public static void main(String[] args) {
        Square square =new Square(5);
        Rectangle rectangle =new Rectangle(1,1);
        Circle circle =new Circle(2);
        System.out.println("trước khi thay đổi:" + "\n" +square.getArea());
        System.out.println(rectangle.getArea());
        System.out.println(circle.getArea());
        System.out.println("sau khi thay đổi:");
        square.resize(Math.random()*100);
        rectangle.resize(Math.random()*100);
        circle.resize(Math.random()*100);
        Geometry1[] geometries =new Geometry1[]{square,rectangle,circle};
        for (Geometry1 geometry:geometries){
            System.out.println(+geometry.getArea());
        }
    }
}

