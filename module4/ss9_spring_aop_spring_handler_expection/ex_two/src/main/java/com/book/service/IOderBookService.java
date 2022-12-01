package com.book.service;

import com.book.model.Book;
import com.book.model.OderBook;

import java.util.List;
import java.util.Optional;

public interface IOderBookService {
    List<OderBook> findAll();

    void saveOder(OderBook oderBook);

    OderBook findByBookRentalCode(long bookRentalCode);
}
