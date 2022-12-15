package com.case_study.demo.controller;

import com.case_study.demo.dto.ContractView;
import com.case_study.demo.dto.CustomerDto;
import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.Contract;
import com.case_study.demo.model.contract.ContractDetail;
import com.case_study.demo.service.contract.IAttachFacilityService;
import com.case_study.demo.service.contract.IContractDetailService;
import com.case_study.demo.service.contract.IContractService;
import com.case_study.demo.service.customer.ICustomerService;
import com.case_study.demo.service.employee.IEmployeeService;
import com.case_study.demo.service.facility.IFacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/contract")
public class ContractController {
    @Autowired
    private IContractService iContractService;
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private IFacilityService iFacilityService;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IContractDetailService iContractDetailService;
    @Autowired
    private IAttachFacilityService iAttachFacilityService;

    @GetMapping("")
    public String pageContract(@PageableDefault(page = 0, size = 5) Pageable pageable, Model model){
        Page<ContractView> contractPage=iContractService.finAll(pageable);
        model.addAttribute("contractListPage",contractPage);
        model.addAttribute("contractDetail", new ContractDetail());
        model.addAttribute("contractList",iContractService.findAll());
//        model.addAttribute("contractDetail",iContractDetailService.finAll());
        model.addAttribute("attachFacility",new AttachFacility());
        model.addAttribute("attachFacilityList",iAttachFacilityService.finAll());
        System.out.println(iAttachFacilityService.finAll());
        return "contract/list";
    }

    @GetMapping("/create")
    public String create(Model model) {
        model.addAttribute("contract", new Contract());
        model.addAttribute("customerList",iCustomerService.finAll());
        model.addAttribute("facilityList",iFacilityService.finAll());
        model.addAttribute("employeeList",employeeService.finAll());

        return "/contract/create";
    }

    @PostMapping("/save")
    public String save( @ModelAttribute("contract") Contract contract, RedirectAttributes redirectAttributes) {
        iContractService.save(contract);
        redirectAttributes.addFlashAttribute("message", "Thêm mới thành công");
        return "redirect:/contract";
    }
}
