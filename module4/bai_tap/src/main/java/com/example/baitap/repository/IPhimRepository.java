package com.example.baitap.repository;

import com.example.baitap.model.Phim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPhimRepository extends JpaRepository<Phim,Long> {
}
