package com.book.model;


import javax.persistence.*;
import java.util.Set;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int quantity;

    @OneToMany(mappedBy = "book")
    private Set<OderBook> oderBooks;

    public Book() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Set<OderBook> getOderBooks() {
        return oderBooks;
    }

    public void setOderBooks(Set<OderBook> oderBooks) {
        this.oderBooks = oderBooks;
    }

}
