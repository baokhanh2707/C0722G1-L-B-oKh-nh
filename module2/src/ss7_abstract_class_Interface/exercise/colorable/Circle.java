package ss7_abstract_class_Interface.exercise.colorable;

import ss6_inheritance.practice.shape.Shape;

public  class Circle extends Geometry implements Colorable {
    private double radius;

    public Circle() {
    }
    public Circle(double radius) {
        this.radius = radius;
    }
    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public void howToColor() {

    }

    @Override
    double getArea() {
        return Math.pow(this.radius,2)*Math.PI;
    }
}