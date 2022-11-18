package com.dictionary.controller;

import com.dictionary.service.IDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("")
public class DictionaryController {
    @Autowired
    private IDictionaryService iDictionaryService;
    @GetMapping("")
    public String showHome(){
        return "/home";
    }

@PostMapping("dictionary")
    public String dictionary(@RequestParam String tiengAnh, Model model){
        String translate= iDictionaryService.tiengViet(tiengAnh);
        model.addAttribute("translate",translate);
        return "/home";
}
}
