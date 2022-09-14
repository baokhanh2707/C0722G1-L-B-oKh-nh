package ss7_abstract_class_Interface.exercise.resizeable;

public class Rectangle extends Geometry1 implements Resizeable {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    @Override
    double getArea() {
        return this.length*this.width ;
    }

    @Override
    public void resize(double percent) {
       setLength(getLength()+getLength()*(percent/100));
       setWidth(getWidth()+getWidth()*(percent/100));

    }
}
