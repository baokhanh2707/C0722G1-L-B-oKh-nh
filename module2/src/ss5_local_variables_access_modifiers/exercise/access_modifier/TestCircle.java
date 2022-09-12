package ss5_local_variables_access_modifiers.exercise.access_modifier;

import ss5_local_variables_access_modifiers.exercise.access_modifier.Circle;

public class TestCircle {
    public static void main(String[] args) {
        Circle circle = new Circle();
        System.out.println(circle.getRadius());
        System.out.println(circle.getArea());
    }
}
