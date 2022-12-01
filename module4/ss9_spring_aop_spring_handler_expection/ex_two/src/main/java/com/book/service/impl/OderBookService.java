package com.book.service.impl;

import com.book.model.OderBook;
import com.book.repository.IOderBookRepository;
import com.book.service.IOderBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class OderBookService implements IOderBookService {
    @Autowired
    private IOderBookRepository iOderBookRepository;

    @Override
    public List<OderBook> findAll() {
        return iOderBookRepository.findAll();
    }

    @Override
    public void saveOder(OderBook oderBook) {
        iOderBookRepository.save(oderBook);
    }

    @Override
    public OderBook findByBookRentalCode(long bookRentalCode) {
        List<OderBook> oderBookList = iOderBookRepository.findAll();
        for (OderBook item : oderBookList) {
            if (item.getBookRentalCode() == bookRentalCode) {
                return item;
            }
        }
        return null;
    }
}
