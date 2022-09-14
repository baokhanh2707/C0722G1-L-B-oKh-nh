package ss7_abstract_class_Interface.exercise.resizeable;

public class Square extends Geometry1 implements Resizeable {
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
    double getArea() {
       return Math.pow(this.edge,2);

    }
    @Override
    public void resize(double percent) {
        setEdge(getEdge()+getEdge()*(percent/100));
    }
}