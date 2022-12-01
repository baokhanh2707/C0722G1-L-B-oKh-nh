package com.book.repository;

import com.book.model.OderBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOderBookRepository extends JpaRepository<OderBook,Integer> {
}
