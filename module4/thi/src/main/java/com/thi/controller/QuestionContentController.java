package com.thi.controller;

import com.thi.model.QuestionContent;
import com.thi.service.IQuestionContentService;
import com.thi.service.IQuestionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class QuestionContentController {
@Autowired
    private IQuestionContentService iQuestionContentService;
@Autowired
    private IQuestionTypeService iQuestionTypeService;
@GetMapping("")
public String list(@RequestParam(defaultValue = "")String title, @RequestParam(defaultValue = "")String questionTypeId
        , @PageableDefault(page = 0,size = 3)Pageable pageable, Model model){
    Page<QuestionContent>questionContents=iQuestionContentService.pageSearch(pageable, title, questionTypeId);
    model.addAttribute("questionContents",questionContents);
    model.addAttribute("questionTypes",iQuestionTypeService.finAll());
    return "list";
}
@PostMapping("/delete")
public String delete(@ModelAttribute("id") Long id, RedirectAttributes redirect) {
    iQuestionContentService.delete(id);
    redirect.addFlashAttribute("message", "Xóa thành công");
    return "redirect:/";
}
    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("questionContent", new QuestionContent());
        model.addAttribute("questionTypes", iQuestionTypeService.finAll());
        return "/create";
    }
    @PostMapping("/save")
    public String save( @ModelAttribute("questionContent") QuestionContent questionContent, RedirectAttributes redirectAttributes) {
        iQuestionContentService.save(questionContent);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/";
    }
}
