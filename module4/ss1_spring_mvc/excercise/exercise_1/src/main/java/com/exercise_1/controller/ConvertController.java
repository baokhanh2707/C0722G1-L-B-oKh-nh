package com.exercise_1.controller;

import com.exercise_1.service.IConvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("")
public class ConvertController {

    @Autowired
    private IConvertService iConvertService;

    @GetMapping("")
    public String showHome(){
        return "/home";
    }

    @PostMapping("convert")
    public String convert(@RequestParam double usd, Model model){
        double result= iConvertService.vnd(usd);
        model.addAttribute("result",result);
        return "/home";
    }
}
