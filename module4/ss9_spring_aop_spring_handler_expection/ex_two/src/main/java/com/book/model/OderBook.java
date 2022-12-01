package com.book.model;

import javax.persistence.*;

@Entity
public class OderBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Long bookRentalCode;
    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private Book book;

    public OderBook() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Long getBookRentalCode() {
        return bookRentalCode;
    }

    public void setBookRentalCode(Long bookRentalCode) {
        this.bookRentalCode = bookRentalCode;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
