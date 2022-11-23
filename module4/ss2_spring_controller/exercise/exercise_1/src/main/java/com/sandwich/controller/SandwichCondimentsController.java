package com.sandwich.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller

public class SandwichCondimentsController {


    @GetMapping("")
    public String showSandwichCondiments() {
        return "/sandwich_condiments";
    }

    @PostMapping("sandwich")
    public String sandwichCondiments(@RequestParam String[]condiment,Model model){
        model.addAttribute("condiment",condiment);
        return "/sandwich_condiments";
    }
}

