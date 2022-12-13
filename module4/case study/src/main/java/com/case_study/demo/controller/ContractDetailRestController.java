package com.case_study.demo.controller;

import com.case_study.demo.model.contract.ContractDetail;
import com.case_study.demo.service.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@CrossOrigin("*")
public class ContractDetailRestController {
    @Autowired
    private IContractDetailService iContractDetailService;
    @PostMapping("/save")
    public String save(@ModelAttribute("contractDetail") ContractDetail contractDetail, RedirectAttributes redirectAttributes) {
        iContractDetailService.save(contractDetail);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/";
    }

}
