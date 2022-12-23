package com.thi.service.impl;

import com.thi.model.QuestionType;
import com.thi.repository.IQuestionTypeRepository;
import com.thi.service.IQuestionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class QuestionTypeService implements IQuestionTypeService {
    @Autowired
    private IQuestionTypeRepository iQuestionTypeRepository;
    @Override
    public List<QuestionType> finAll() {
        return iQuestionTypeRepository.findAll() ;
    }
}
