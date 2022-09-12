package ss6_inheritance.practice.square;

public class TestSquare {
    public static void main(String[] args) {
        Square square = new Square();
        System.out.println(square);
        square=new Square("black",false,3);
        System.out.println(square);
    }
}
