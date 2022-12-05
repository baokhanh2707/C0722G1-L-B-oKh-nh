package com.blog.demo.controller;

import com.blog.demo.model.Blog;
import com.blog.demo.model.Category;
import com.blog.demo.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("")
    public String showList(Model model) {
        model.addAttribute("categoryList", iCategoryService.findAll());
        return "/category/list";
    }


    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("category", new Category());
        return "/category/create";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute("category") Category category, RedirectAttributes redirect) {
        iCategoryService.save(category);
        redirect.addFlashAttribute("message", "thêm mới thành công");
        return "redirect:/category";
    }

    @GetMapping("/delete")
    public String delete(Integer id, Model model) {
        Optional<Category> category = iCategoryService.findById(id);
        model.addAttribute("category", category);
        return "/category/delete";
    }

    @PostMapping("/delete")
    public String deleteBlog(@ModelAttribute("category") Category category, RedirectAttributes redirect) {
        iCategoryService.delete(category);
        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/category";
    }
    @GetMapping("/edit")
    public String update(Integer id, Model model) {
        Optional<Category> category = iCategoryService.findById(id);
        model.addAttribute("category", category);
        return "/category/edit";
    }

    @PostMapping("/update")
    public String edit(@ModelAttribute("category") Category category, RedirectAttributes redirect) {
        iCategoryService.save(category);
        redirect.addFlashAttribute("message", "Sửa thành công");
        redirect.addFlashAttribute("category", category);
        return "redirect:/category";
    }
}
