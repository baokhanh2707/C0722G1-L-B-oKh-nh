package com.case_study.demo.controller;
import com.case_study.demo.dto.CustomerDto;
import com.case_study.demo.model.customer.Customer;
import com.case_study.demo.model.facility.Facility;
import com.case_study.demo.service.facility.IFacilityService;
import com.case_study.demo.service.facility.IFacilityTypeService;
import com.case_study.demo.service.facility.IRentTypeService;
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
@RequestMapping("/facility")
public class FacilityController {
    @Autowired
    private IFacilityService iFacilityService;
    @Autowired
    private IFacilityTypeService iFacilityTypeService;
    @Autowired
    private IRentTypeService iRentTypeService;

    @GetMapping("")
    public String listFacility(@RequestParam(defaultValue = "") String searchByName,@RequestParam(defaultValue = "") String searchByFacilityType, @PageableDefault(page = 0, size = 5) Pageable pageable, Model model) {
        Page<Facility> facilityList = iFacilityService.search(searchByName,searchByFacilityType, pageable);
        model.addAttribute("facilityList", facilityList);
        model.addAttribute("facilityTypeList", iFacilityTypeService.finAll());
        model.addAttribute("rentTypeList", iRentTypeService.finAll());
        return "facility/list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("facility", new Facility());
        model.addAttribute("facilityTypeList", iFacilityTypeService.finAll());
        model.addAttribute("rentTypeList", iRentTypeService.finAll());
        return "/facility/create";
    }

    @PostMapping("/save")
    public String save( @ModelAttribute("facility") Facility facility, RedirectAttributes redirectAttributes) {
        iFacilityService.save(facility);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/facility";
    }

    @PostMapping("/delete")
    public String delete(@ModelAttribute("id") Long id, RedirectAttributes redirect) {
        iFacilityService.delete(id);
        redirect.addFlashAttribute("message", "Xóa thành công");
        return "redirect:/facility";
    }

    @GetMapping("/edit")
    public String edit(@RequestParam(required = false) Long id, Model model) {
        Optional<Facility> facility = iFacilityService.findById(id);
        model.addAttribute("facility",facility.get());
        model.addAttribute("facilityTypeList", iFacilityTypeService.finAll());
        model.addAttribute("rentTypeList", iRentTypeService.finAll());
        return "/facility/edit";
    }

    @PostMapping("/update")
    public String update( @ModelAttribute("facility") Facility facility , RedirectAttributes redirect) {
        iFacilityService.save(facility);
        redirect.addFlashAttribute("message", "Sửa thành công");
        return "redirect:/facility";
    }

}