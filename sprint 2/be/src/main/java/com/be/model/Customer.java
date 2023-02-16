package com.be.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phoneNumber;
    private boolean flagDelete;
    private String birthday;
    private String address;
    private String email;
    @OneToOne()
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
    @OneToMany(mappedBy = "customer")
    public Set<Oder> oderSet;

    public Customer() {
    }
}
