package com.thi.repository;

import com.thi.model.QuestionContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;

public interface IQuestionContentRepository extends JpaRepository<QuestionContent,Long> {
    @Query(value = "select * from question_content as q where  (q.title like concat('%',:title,'%') and q.question_type_id like concat ('%',:questionTypeId,'%') )"
            , countQuery = "select * from question_content as q where  (q.title like concat('%',:title,'%') and q.question_type_id like concat ('%',:questionTypeId,'%') )"
            , nativeQuery = true)
    Page<QuestionContent> searchPage(Pageable pageable, @Param("title") String title, @Param("questionTypeId") String questionTypeId);

}
