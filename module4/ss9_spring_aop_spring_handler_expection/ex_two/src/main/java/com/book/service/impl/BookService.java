package com.book.service.impl;

import com.book.model.Book;
import com.book.repository.IBookRepository;
import com.book.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService implements IBookService {
    @Autowired
    IBookRepository iBookRepository;
    @Override
    public List<Book> findAll() {
        return iBookRepository.findAll();
    }

    @Override
    public Book findById(int id) {
        return iBookRepository.findById(id).orElse(new Book());    }

    @Override
    public void saveBook(Book book) {
        iBookRepository.save(book);
    }
}
