package com.example.baitap.controller;

import com.example.baitap.dto.SuatChieuDto;
import com.example.baitap.model.SuatChieu;
import com.example.baitap.service.IPhimService;
import com.example.baitap.service.ISuatChieuService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("")
public class SuatChieuController {
    @Autowired
    private IPhimService iPhimService;
    @Autowired
    private ISuatChieuService iSuatChieuService;

    @GetMapping("")
    public String list(@PageableDefault(page = 0, size = 3) Pageable pageable, Model model) {
        Page<SuatChieu> suatChieuPage = iSuatChieuService.finAll(pageable);
        model.addAttribute("suatChieu", suatChieuPage);
        model.addAttribute("phimList", iPhimService.finAll());
        return "list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("suatChieuDto", new SuatChieuDto());
        model.addAttribute("suatChieu", new SuatChieu());
        model.addAttribute("phimList", iPhimService.finAll());
        return "/create";

    }

    @PostMapping("/save")
    public String save(@Validated @ModelAttribute("suatChieuDto") SuatChieuDto suatChieuDto, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("phimList", iPhimService.finAll());
            return "/create";
        }
        SuatChieu suatChieu = new SuatChieu();
        BeanUtils.copyProperties(suatChieuDto, suatChieu);
        iSuatChieuService.save(suatChieu);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/";
    }
    @PostMapping("/delete")
    public String delete(@ModelAttribute("id") String id, RedirectAttributes redirect) {
        iSuatChieuService.delete(id);
        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/";
    }
}
