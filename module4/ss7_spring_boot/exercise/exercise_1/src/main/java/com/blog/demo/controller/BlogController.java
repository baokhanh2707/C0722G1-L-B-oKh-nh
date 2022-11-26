package com.blog.demo.controller;

import com.blog.demo.model.Blog;
import com.blog.demo.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

@Controller
public class BlogController {
    @Autowired
    private IBlogService iBlogService;

    @GetMapping("")
    public String showList(Model model) {
        List<Blog> blogList = iBlogService.findAll();
        model.addAttribute("blogList", blogList);
        return "/list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("blog", new Blog());
        return "/create";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute("blog") Blog blog, RedirectAttributes redirect) {
        iBlogService.save(blog);
        redirect.addFlashAttribute("message", "thêm mới thành công");
        return "redirect:/";
    }

    @GetMapping("/delete")
    public String delete(Integer id, Model model) {
        Optional<Blog> blog = iBlogService.findById(id);
        model.addAttribute("blog", blog);
        return "/delete";
    }

    @PostMapping("/delete")
    public String deleteBlog(@ModelAttribute("blog") Blog blog, RedirectAttributes redirect) {
        iBlogService.delete(blog);
        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/";
    }

    @GetMapping("/view")
    public String view(Integer id, Model model) {
        Optional<Blog> blog = iBlogService.findById(id);
        model.addAttribute("blog", blog);
        return "/view";
    }

    @GetMapping("/edit")
    public String update(Integer id, Model model) {
        Optional<Blog> blog = iBlogService.findById(id);
        model.addAttribute("blog", blog);
        return "/edit";
    }

    @PostMapping("/update")
    public String edit(@ModelAttribute("blog") Blog blog, RedirectAttributes redirect) {
        iBlogService.save(blog);
        redirect.addFlashAttribute("message", "Sửa thành công");
        redirect.addFlashAttribute("blog", blog);
        return "redirect:/";
    }
}
