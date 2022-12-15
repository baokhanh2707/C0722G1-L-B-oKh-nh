package com.case_study.demo.controller;

import com.case_study.demo.dto.ContractDetailDto;
import com.case_study.demo.model.contract.ContractDetail;
import com.case_study.demo.service.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/contractDetail")
public class ContractDetailRestController {
@Autowired
    private IContractDetailService iContractDetailService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ContractDetailDto>> view(@PathVariable("id") Long id){
        List<ContractDetailDto>contractDetailList=iContractDetailService.ContractDetails(id);
        if(contractDetailList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contractDetailList, HttpStatus.OK);
    }
}
