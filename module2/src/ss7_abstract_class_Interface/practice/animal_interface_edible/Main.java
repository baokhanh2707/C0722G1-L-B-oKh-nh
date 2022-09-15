package ss7_abstract_class_Interface.practice.animal_interface_edible;

import java.util.Arrays;

public class Main {
    public static void main(String[] args) {

        Animals[] animals = new Animals[2];
        animals[0] = new Tiger();
        animals[1] = new Chicken();
        for (Animals animal : animals) {
            animal.makeSound();
        }
        System.out.println(Arrays.toString(animals));
        Fruit[] fruits = new Fruit[2];
        fruits[0] = new Orange();
        fruits[1] = new Apple();
        for(Fruit fruit : fruits){
            System.out.println(fruit.howtoEat());
        }

    }
}