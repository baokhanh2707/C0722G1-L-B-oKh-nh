package com.container.controller;

import com.container.dto.CartDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/cart")
public class CartController {
    @GetMapping("")
    public ModelAndView showCart(@SessionAttribute(required = false, name = "cart") CartDto cart, Model model) {
        model.addAttribute("total", cart.countTotalPayment());
        return new ModelAndView("cart/list", "cart", cart);
    }
}
