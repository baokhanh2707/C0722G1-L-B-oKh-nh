package com.book.service;

import com.book.model.Book;

import java.util.List;
import java.util.Optional;

public interface IBookService {
    List<Book> findAll();

    Book findById(int id);

    void saveBook(Book book);

}
