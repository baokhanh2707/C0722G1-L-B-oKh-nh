package com.case_study.demo.controller;

import com.case_study.demo.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")


public class HomeController {
    @GetMapping("")
    public String home() {
        return "home";
    }
}
