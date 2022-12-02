package com.book.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionBookController {
    @ExceptionHandler(Exception.class)
    public String handleException(){
        return "error";
    }
    @ExceptionHandler(NullPointerException.class)
    public String HandleNullException(){
        return "error";
    }
}
