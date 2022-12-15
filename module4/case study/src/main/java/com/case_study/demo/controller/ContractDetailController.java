package com.case_study.demo.controller;

import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.ContractDetail;
import com.case_study.demo.model.facility.Facility;
import com.case_study.demo.service.contract.IAttachFacilityService;
import com.case_study.demo.service.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/contractDetail")
public class ContractDetailController {
    @Autowired
    private IContractDetailService iContractDetailService;
    @Autowired
    private IAttachFacilityService iAttachFacilityService;


    @PostMapping("/save")
    public String save(@ModelAttribute("contractDetail") ContractDetail contractDetail, RedirectAttributes redirectAttributes, Model model) {
        iContractDetailService.save(contractDetail);
//        AttachFacility attachFacility=new AttachFacility();
//        model.addAttribute("attachFacility",attachFacility);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/contract";
    }


}
