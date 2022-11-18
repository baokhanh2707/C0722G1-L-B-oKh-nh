package com.convert.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ConvertController {
@GetMapping("/convert")
    public String convert (int number, Model model) {
model.addAttribute("number",number);
return "/home";
}
}
