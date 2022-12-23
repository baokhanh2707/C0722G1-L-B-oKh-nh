package com.thi.service;

import com.thi.model.QuestionContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IQuestionContentService  {
    Page<QuestionContent>pageSearch( Pageable pageable,String title, String idQuestionType);
    void delete(Long id);
    QuestionContent save(QuestionContent questionContent);

}
