package com.be.controller;

import com.be.security.JwtProvider;
import com.be.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "*",allowedHeaders = "*")
@RequestMapping("api")
public class SecurityController {
@Autowired
    private JwtProvider jwtProvider;
@Autowired
    private IAccountService iAccountService;

}
