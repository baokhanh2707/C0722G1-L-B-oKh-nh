package com.sandwich.repository.impl;

import com.sandwich.repository.ISandwichCondimentsRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SandwichCondimentsRepository implements ISandwichCondimentsRepository {
    @Override
    public List<String> list(String lettuce, String tomato, String mustard, String sprouts) {
        List<String> listSandwich = new ArrayList<>();
        if (lettuce != null) {
            listSandwich.add(lettuce);
        }
        if (tomato != null) {
            listSandwich.add(tomato);
        }
        if (mustard != null) {
            listSandwich.add(mustard);
        }
        if (sprouts != null) {
            listSandwich.add(sprouts);
        }

        return listSandwich;
    }
}
