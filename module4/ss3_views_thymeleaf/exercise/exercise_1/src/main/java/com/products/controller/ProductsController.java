package com.products.controller;

import com.products.model.Products;
import com.products.service.IProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("")
public class ProductsController {
    @Autowired
    IProductsService iProductsService;

    @GetMapping("")
    public String showList(Model model) {
        List<Products> productsList = iProductsService.findAll();
        model.addAttribute("productsList", productsList);
        return "/list";
    }

    @GetMapping("{id}/edit")
    public String update(@PathVariable int id, Model model) {
        Products products = iProductsService.findById(id);
        model.addAttribute("products", products);
        return "/edit";
    }

    @PostMapping("/edit")
    public String edit(Products products, RedirectAttributes redirectAttributes) {
        iProductsService.update(products.getId(), products);
        redirectAttributes.addFlashAttribute("message", "Chỉnh sửa thành công");
        return "redirect:/";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("products", new Products());
        return "/create";
    }

    @PostMapping("/save")
    public String save(Products products) {
        iProductsService.add(products);
        return "redirect:/";
    }

    @GetMapping("{id}/view")
    public String view(@PathVariable int id, Model model) {
        model.addAttribute("products", iProductsService.findById(id));
        return "/view";
    }

    @GetMapping("/search")
    public String search(String name, Model model) {
        List<Products> productsList = iProductsService.search(name);
        model.addAttribute("productsList", productsList);
        return "/list";
    }

    @GetMapping("/{id}/delete")
    public String delete(@PathVariable int id, Model model) {
        model.addAttribute("products", iProductsService.findById(id));
        return "/delete";
    }

    @PostMapping("/delete")
    public String delete(Products products, RedirectAttributes redirect) {
        iProductsService.delete(products.getId());
        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/";
    }

}
