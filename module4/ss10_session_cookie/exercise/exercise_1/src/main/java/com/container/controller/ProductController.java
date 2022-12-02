package com.container.controller;

import com.container.model.Product;
import com.container.service.IProductService;
import com.container.dto.CartDto;
import com.container.dto.ProductDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Controller
@RequestMapping("/shop")
@SessionAttributes("cart")
public class ProductController {
    @Autowired
    private IProductService productService;

    @ModelAttribute("cart")
    public CartDto initCart() {
        return new CartDto();
    }

    @GetMapping("/add/{id}")
    public String addToCart(@PathVariable Long id, @SessionAttribute(required = false, name = "cart") CartDto cart) {
        Optional<Product> product = productService.findById(id);
        if (product.isPresent()) {
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product.get(), productDto);
            cart.addProduct(productDto);
        }
        return "redirect:/cart";
    }

    @GetMapping("/detail/{id}")
    public ModelAndView showDetail(@PathVariable Long id, HttpServletResponse response) {
        Cookie cookie = new Cookie("idProduct", String.valueOf(id));
        cookie.setMaxAge(30);
        cookie.setPath("/");
        response.addCookie(cookie);
        return new ModelAndView("product/detail", "product", productService.findById(id).get());
    }

    @GetMapping
    public ModelAndView showListPage(Model model,
                                     @CookieValue(value = "idProduct", defaultValue = "-1") Long idProduct) {
        if (idProduct != -1) {
            model.addAttribute("historyProduct", productService.findById(idProduct).get());
        }
        return new ModelAndView("product/list", "productList", productService.findAll());
    }

    @GetMapping("/decrease/{id}")
    public String decreaseToCart(@PathVariable Long id, @SessionAttribute(required = false, name = "cart") CartDto cart) {
        Optional<Product> product = productService.findById(id);
        if (product.isPresent()) {
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product.get(), productDto);
            cart.decreaseProduct(productDto);
        }
        return "redirect:/cart";
    }

    @PostMapping("/pay")
    public String pay(@SessionAttribute("cart") CartDto cart) {
        cart.payCart();
        return "redirect:/cart";
    }
}
