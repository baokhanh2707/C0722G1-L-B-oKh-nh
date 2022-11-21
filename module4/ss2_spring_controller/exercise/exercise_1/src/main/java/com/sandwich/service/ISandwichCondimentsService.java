package com.sandwich.service;


import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface ISandwichCondimentsService {
    List<String> list(String lettuce, String tomato, String mustard, String sprouts);

}
