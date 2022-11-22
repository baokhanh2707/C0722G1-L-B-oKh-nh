package com.settings.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SettingsController {
    @GetMapping("")
    public String showSettings(){
        return "/settings";
    }

}
