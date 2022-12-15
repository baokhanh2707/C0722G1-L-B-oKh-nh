package com.case_study.demo.controller;

import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.facility.Facility;
import com.case_study.demo.service.contract.IAttachFacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/attachFacility")
public class AttachFacilityController {
    @Autowired
    private IAttachFacilityService iAttachFacilityService;


    @PostMapping("/save")
    public String save(@ModelAttribute("attachFacility") AttachFacility attachFacility, RedirectAttributes redirectAttributes) {
        iAttachFacilityService.save(attachFacility);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/contract";
    }

}
