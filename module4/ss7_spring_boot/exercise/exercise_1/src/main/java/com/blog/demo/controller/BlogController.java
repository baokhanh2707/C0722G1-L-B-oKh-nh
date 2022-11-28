package com.blog.demo.controller;

import com.blog.demo.model.Blog;
import com.blog.demo.model.Category;
import com.blog.demo.service.IBlogService;
import com.blog.demo.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private IBlogService iBlogService;
    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("")
    public String showList(@RequestParam(defaultValue = "") String search, @PageableDefault(page = 0,size = 5) Pageable pageable, Model model) {
        Page<Blog> blogList = iBlogService.searchByName(search,pageable);
        model.addAttribute("blogList", blogList);
        return "/blog/list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("blog", new Blog());
        model.addAttribute("categoryList", iCategoryService.findAll());
        return "/blog/create";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute("blog") Blog blog, RedirectAttributes redirect) {
        iBlogService.save(blog);
        redirect.addFlashAttribute("message", "thêm mới thành công");
        return "redirect:/blog";
    }

    @GetMapping("/delete")
    public String delete(@RequestParam(required = false) Integer id, Model model) {
        Optional<Blog> blog = iBlogService.findById(id);
        model.addAttribute("categoryList", iCategoryService.findAll());
        model.addAttribute("blog", blog);
        return "/blog/delete";
    }

    @PostMapping("/delete")
    public String deleteBlog(@ModelAttribute("blog") Blog blog, RedirectAttributes redirect) {
        iBlogService.delete(blog);

        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/blog";
    }

    @GetMapping("/view")
    public String view(@RequestParam(required = false) Integer id, Model model) {
        Optional<Blog> blog = iBlogService.findById(id);
        List<Category> blogList = iCategoryService.findAll();
        model.addAttribute("blog", blog);
        model.addAttribute("blogList", blogList);
        return "/blog/view";
    }

    @GetMapping("/edit")
    public String update(@RequestParam(required = false) Integer id, Model model) {
        Optional<Blog> blog = iBlogService.findById(id);
        model.addAttribute("categoryList", iCategoryService.findAll());
        model.addAttribute("blog", blog);
        return "/blog/edit";
    }

    @PostMapping("/update")
    public String edit(@ModelAttribute("blog") Blog blog, RedirectAttributes redirect) {
        iBlogService.save(blog);
        redirect.addFlashAttribute("message", "Sửa thành công");
        redirect.addFlashAttribute("blog", blog);
        return "redirect:/blog";
    }
}
