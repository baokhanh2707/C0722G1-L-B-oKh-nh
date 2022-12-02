package com.book.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Aspect
public class LogAspect {
    @Pointcut("within(com.book.controller.*))")
    public void callMethod(){}
    @Before("callMethod()")
    public void beforeMethod(JoinPoint joinPoint){
        System.err.println("Đang vào phương thức " + joinPoint.getSignature().getName()+"vào thời gian : "+ LocalDateTime.now());
    }
    @Pointcut("execution(* com.book.controller.BookController.save*(..))")
    public void callPayAndSave(){}
    @Before("callPayAndSave()")
    public void beforeCall(JoinPoint joinPoint){
        System.err.println("Đang vào phương thức thêm và trả " + joinPoint.getSignature().getName()+"vào thời gian : "+ LocalDateTime.now());

    }
}
