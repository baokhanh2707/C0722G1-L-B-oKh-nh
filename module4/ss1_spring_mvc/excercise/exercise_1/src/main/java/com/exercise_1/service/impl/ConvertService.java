package com.exercise_1.service.impl;

import com.exercise_1.service.IConvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConvertService implements IConvertService {
    @Override
    public double vnd(double usd) {
        return usd*23000;
    }
}
