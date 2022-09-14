package ss7_abstract_class_Interface.exercise.colorable;

import ss6_inheritance.practice.rectangle.Rectangle;

public class  Square extends Geometry implements Colorable{

    private double edge ;

    public double getEdge() {
        return edge;
    }

    public void setEdge(double edge) {
        this.edge = edge;
    }

    public Square(double edge) {
        this.edge = edge;
    }

    @Override
    public void howToColor() {
        System.out.println("Color all four sides");
    }

    @Override
    double getArea() {
        return Math.pow(this.edge,2);
    }
}


