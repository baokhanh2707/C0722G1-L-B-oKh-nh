package com.sandwich.repository;

import java.util.List;

public interface ISandwichCondimentsRepository {
    List<String> list(String lettuce, String tomato, String mustard, String sprouts);
}
