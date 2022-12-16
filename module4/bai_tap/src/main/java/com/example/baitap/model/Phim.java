package com.example.baitap.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Phim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tenPhim;

    @OneToMany(mappedBy = "phim")
    private Set<SuatChieu> suatChieus;

    public Phim() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenPhim() {
        return tenPhim;
    }

    public void setTenPhim(String tenPhim) {
        this.tenPhim = tenPhim;
    }

    public Set<SuatChieu> getSuatChieus() {
        return suatChieus;
    }

    public void setSuatChieus(Set<SuatChieu> suatChieus) {
        this.suatChieus = suatChieus;
    }
}