package com.case_study.demo.controller;

import com.case_study.demo.model.contract.AttachFacility;
import com.case_study.demo.model.contract.ContractDetail;
import com.case_study.demo.service.contract.IAttachFacilityService;
import com.case_study.demo.service.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@CrossOrigin("*")
@RequestMapping("/contractDetail")
public class ContractDetailRestController {
    @Autowired
    private IContractDetailService iContractDetailService;

    @PostMapping("/create")
    public ResponseEntity<ContractDetail> create(@RequestBody ContractDetail contractDetail) {
        iContractDetailService.save(contractDetail);
        return new ResponseEntity<>(contractDetail, HttpStatus.OK);
    }


}
