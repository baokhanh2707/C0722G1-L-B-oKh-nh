package ss6_inheritance.practice.rectangle;

import com.sun.xml.internal.ws.policy.EffectiveAlternativeSelector;

public class TestRectangle {
    public static void main(String[] args) {
        Rectangle rectangle =new Rectangle();
        System.out.println(rectangle);
        rectangle=new Rectangle("green",false,2.0,3.0);
        System.out.println(rectangle);
    }
}
