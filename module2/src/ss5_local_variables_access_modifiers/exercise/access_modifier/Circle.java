package ss5_local_variables_access_modifiers.exercise.access_modifier;

public class Circle {
    private double radius=2.0;
    private String color ="red";

    public Circle(double radius) {
        this.radius = radius;

    }

    public Circle() {
    }

    public double getRadius() {
        return radius;
    }
    public double getArea(){
        return Math.PI*Math.pow(getRadius(),2);
    }
}
