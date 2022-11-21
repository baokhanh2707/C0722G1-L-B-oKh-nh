package com.sandwich.controller;

import com.sandwich.service.ISandwichCondimentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller

public class SandwichCondimentsController {
    @Autowired
    ISandwichCondimentsService iSandwichCondimentsService;

    @GetMapping("")
    public String showSandwichCondiments() {
        return "/sandwichCondiments";
    }

    @PostMapping("sandwich")
    public String sandwichCondiments(@RequestParam(value = "Lettuce", required = false) String lettuce,
                                     @RequestParam(value = "Tomato", required = false) String tomato,
                                     @RequestParam(value = "Mustard", required = false) String mustard,
                                     @RequestParam(value = "Sprouts", required = false) String sprouts, Model model) {
        List<String> result = iSandwichCondimentsService.list(lettuce, tomato, mustard, sprouts);
        model.addAttribute("result", result);
        return "/sandwichCondiments";
    }
}

