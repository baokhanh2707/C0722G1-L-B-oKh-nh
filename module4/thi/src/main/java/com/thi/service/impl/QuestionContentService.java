package com.thi.service.impl;

import com.thi.model.QuestionContent;
import com.thi.repository.IQuestionContentRepository;
import com.thi.service.IQuestionContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuestionContentService implements IQuestionContentService {
    @Autowired
    private IQuestionContentRepository iQuestionContentRepository;
    @Override
    public Page<QuestionContent> pageSearch(Pageable pageable, String questionTypeId, String title) {
        return iQuestionContentRepository.searchPage(pageable,title,questionTypeId);
    }

    @Override
    public void delete(Long id) {
        iQuestionContentRepository.deleteById(id);
    }

    @Override
    public QuestionContent save(QuestionContent questionContent) {
        return iQuestionContentRepository.save(questionContent);
    }
}
