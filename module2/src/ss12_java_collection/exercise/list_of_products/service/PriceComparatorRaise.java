package ss12_java_collection.exercise.list_of_products.service;

import ss12_java_collection.exercise.list_of_products.model.Fruit;

import java.util.Comparator;

public class PriceComparatorRaise implements Comparator<Fruit> {

    @Override
    public int compare(Fruit o1, Fruit o2) {
        if(o1.getPrice()>o2.getPrice()){
            return 1;
        }else if(o1.getPrice()==o2.getPrice()){
            return 0;
        }else {
            return -1;
        }
    }
}
