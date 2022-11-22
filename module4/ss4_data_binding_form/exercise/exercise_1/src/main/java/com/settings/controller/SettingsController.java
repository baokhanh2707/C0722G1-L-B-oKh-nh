package com.settings.controller;

import com.settings.model.Settings;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class SettingsController {
    @GetMapping("")
    public String showSettings(Model model) {
        List<String> languages = Arrays.asList("English", "Vietnamese", "Japanese", "Chinese");
        List<Integer> pageSizes = Arrays.asList(5, 10, 15, 25, 50, 100);
        model.addAttribute("languages", languages);
        model.addAttribute("pageSizes", pageSizes);
        model.addAttribute("settings", new Settings());
        return "/settings";
    }

    @PostMapping("save")
    public String save(@ModelAttribute("settings") Settings settings, Model model) {
        model.addAttribute("settings", settings);
        return "/result";
    }
}
