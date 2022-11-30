package com.case_study.demo.controller;

import com.case_study.demo.model.Customer;
import com.case_study.demo.service.customer.ICustomerService;
import com.case_study.demo.service.customer.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private ICustomerTypeService iCustomerTypeService;
    @GetMapping("")
    public String listCustomer(@RequestParam(defaultValue = "") String search, @PageableDefault(page = 0,size = 5)Pageable pageable , Model model){
        Page<Customer>customerList=iCustomerService.searchByName(search,pageable);
        model.addAttribute("customerList",customerList);
        return "customer/list";
    }
    @GetMapping("/create")
    public String create(Model model){
        model.addAttribute("customer",new Customer());
        model.addAttribute("customerTypeList",iCustomerTypeService.findAll());
        return "/customer/create";
    }
    @PostMapping("/save")
    public String save(@ModelAttribute("customer")Customer customer, RedirectAttributes redirectAttributes){
        iCustomerService.save(customer);
        redirectAttributes.addFlashAttribute("message","Thêm mới thành công");
        return "redirect:/customer";
    }
}
