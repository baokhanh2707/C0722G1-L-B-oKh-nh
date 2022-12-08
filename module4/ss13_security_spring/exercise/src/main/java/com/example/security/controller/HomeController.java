package com.example.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String homeShow() {
        return "/home";
    }
    @GetMapping("user")
    public String homeUser() {
        return "/user";
    }
    @GetMapping("admin")
    public String homeAdmin() {
        return "/admin";
    }

}
