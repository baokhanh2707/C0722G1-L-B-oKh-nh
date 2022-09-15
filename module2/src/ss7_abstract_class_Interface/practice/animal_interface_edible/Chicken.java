package ss7_abstract_class_Interface.practice.animal_interface_edible;

public class Chicken extends Animals implements Edible {
    @Override
    public String toString() {
        return "Chicken:cục tác cục tác";
    }

    @Override
    public String howtoEat() {
        return "could be freid";
    }
}
