package com.thi.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class QuestionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String name;
    @OneToMany(mappedBy = "idQuestionType")
    Set<QuestionContent>questionContentSet;

    public QuestionType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<QuestionContent> getQuestionContentSet() {
        return questionContentSet;
    }

    public void setQuestionContentSet(Set<QuestionContent> questionContentSet) {
        this.questionContentSet = questionContentSet;
    }
}
