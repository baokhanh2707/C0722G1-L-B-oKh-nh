package com.user.demo.controller;

import com.user.demo.model.User;
import com.user.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
@Controller
public class UserController {
    @Autowired
    private IUserService iUserService;

    @GetMapping("")
    public String showHome(Model model) {
        model.addAttribute("user", new User());
        return "/index";
    }

    @PostMapping("/user")
    public String checkValidate(@Validated @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "/index";
        }

        iUserService.save(user);
        model.addAttribute("user", user);
        return "/result";
    }
}
