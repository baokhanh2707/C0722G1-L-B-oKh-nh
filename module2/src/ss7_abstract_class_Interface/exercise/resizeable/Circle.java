package ss7_abstract_class_Interface.exercise.resizeable;

public  class Circle extends Geometry1 implements Resizeable {
    private double radius  ;

    public Circle(double radius) {
        this.radius = radius;
    }


    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public double getArea() {
        return radius * radius * Math.PI;
    }

    public double getPerimeter() {
        return 2 * radius * Math.PI;
    }
    @Override
    public void resize(double percent) {
        setRadius(radius+radius*(percent/100));

    }
}