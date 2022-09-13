package ss6_inheritance.exercise.layer_circle_cylinder.cylinder;

import ss6_inheritance.exercise.layer_circle_cylinder.circles.Circle;

public class Cylinder extends Circle {
    private double height =5.0;

    public Cylinder(double height) {
        this.height = height;
    }

    public Cylinder(double radius, String color, double height) {
        super(radius, color);
        this.height = height;
    }

    public Cylinder() {

    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getVolume() {
        return getArea()*this.height;
    }

    @Override
    public String toString() {
        return "Cylinder{" +
                "height=" + height +
                "thể tích hình trụ là : " + getVolume() +
                ", which is a subclass of " +
                super.toString();
    }
}

