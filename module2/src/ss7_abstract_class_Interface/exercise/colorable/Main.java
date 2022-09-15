package ss7_abstract_class_Interface.exercise.colorable;

public class Main {
    public static void main(String[] args) {
        Square square =new Square(1);
        Circle circle =new Circle(1);
        Rectangle rectangle =new Rectangle(2,2);

        Geometry[] geometries =new Geometry[]{square,circle,rectangle};
        for (Geometry geometry:geometries) {
            if(geometry instanceof Colorable){
                ((Square)geometry).howToColor();
            }else {
                System.out.println(geometry.getArea());
            }
        }

    }
}
