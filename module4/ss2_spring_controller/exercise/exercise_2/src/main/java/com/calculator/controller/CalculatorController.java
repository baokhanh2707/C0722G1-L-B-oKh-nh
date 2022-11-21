package com.calculator.controller;

import com.calculator.service.ICalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CalculatorController {
    @Autowired
    ICalculatorService iCalculatorService;

    @GetMapping
    public String showCalculator() {
        return "/calculator";
    }

    @PostMapping("calculator")
    public String calculator(@RequestParam double number1, @RequestParam double number2, @RequestParam String sign, Model model) {
        double result = iCalculatorService.calculator(number1, number2, sign);
        model.addAttribute("result", result);
        return "/calculator";
    }

}
