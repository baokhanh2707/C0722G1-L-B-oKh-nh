package com.case_study.demo.controller;

import com.case_study.demo.dto.CustomerDto;
import com.case_study.demo.model.customer.Customer;
import com.case_study.demo.service.customer.ICustomerService;
import com.case_study.demo.service.customer.ICustomerTypeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private ICustomerTypeService iCustomerTypeService;

    @GetMapping("")
    public String listCustomer(@RequestParam(defaultValue = "") String searchByName,@RequestParam(defaultValue = "") String searchByEmail,@RequestParam(defaultValue = "") String searchByType, @PageableDefault(page = 0, size = 5) Pageable pageable, Model model) {
        Page<Customer> customerList = iCustomerService.searchByName(searchByName,searchByEmail,searchByType, pageable);
        model.addAttribute("customerList", customerList);
        model.addAttribute("customerTypeList", iCustomerTypeService.findAll());
        return "customer/list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("customerDto", new CustomerDto());
        model.addAttribute("customerTypeList", iCustomerTypeService.findAll());
        return "/customer/create";
    }

    @PostMapping("/save")
    public String save(@Validated @ModelAttribute("customerDto") CustomerDto customerDto, BindingResult bindingResult, RedirectAttributes redirectAttributes, Model model) {
        new CustomerDto().validate(customerDto, bindingResult);
        if (bindingResult.hasErrors()) {
            model.addAttribute("customerTypeList", iCustomerTypeService.findAll());
            return "/customer/create";
        }
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDto, customer);
        iCustomerService.save(customer);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/customer";
    }

    @GetMapping("/edit")
    public String edit(@RequestParam(required = false) Integer id, Model model) {
        Optional<Customer> customer = iCustomerService.findById(id);
        model.addAttribute("customerTypeList", iCustomerTypeService.findAll());
        model.addAttribute("customerDto", customer.get());
        return "/customer/edit";
    }

    @PostMapping("/update")
    public String update(@Validated @ModelAttribute("customerDto") CustomerDto customerDto,BindingResult bindingResult , RedirectAttributes redirect,Model model) {
        new CustomerDto().validate(customerDto,bindingResult);
        if(bindingResult.hasErrors()){
            model.addAttribute("customerTypeList", iCustomerTypeService.findAll());
            return "/customer/edit";
        }
        Customer customer=new Customer();
        BeanUtils.copyProperties(customerDto,customer);
        iCustomerService.save(customer);
        redirect.addFlashAttribute("message", "Sửa thành công");
        return "redirect:/customer";
    }

    @PostMapping("/delete")
    public String delete(@ModelAttribute("id") Integer id, RedirectAttributes redirect) {
        iCustomerService.delete(id);
        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/customer";
    }

}