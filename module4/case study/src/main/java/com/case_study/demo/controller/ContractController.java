package com.case_study.demo.controller;

import com.case_study.demo.dto.ContractView;
import com.case_study.demo.dto.CustomerDto;
import com.case_study.demo.model.contract.Contract;
import com.case_study.demo.service.contract.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/contract")
public class ContractController {
    @Autowired
    private IContractService iContractService;

    @GetMapping
    public String pageContract(@PageableDefault(page = 0, size = 5) Pageable pageable, Model model){
        Page<ContractView> contractPage=iContractService.finAll(pageable);
        model.addAttribute("contractListPage",contractPage);
        return "contract/list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("contract", new Contract());
        return "/contract/create";
    }

    @PostMapping("/save")
    public String save( @ModelAttribute("contract") Contract contract, RedirectAttributes redirectAttributes) {
        iContractService.save(contract);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "contract/list";
    }
}
