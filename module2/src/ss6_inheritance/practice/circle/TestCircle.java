package ss6_inheritance.practice.circle;

public class TestCircle {
    public static void main(String[] args) {
        Circle circle=new Circle();
        System.out.println(circle);
        circle=new Circle(3.0,"yellow",false);
        System.out.println(circle);
    }
}
