package com.example.demo.repository;

import com.example.demo.model.LoHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILoHangRepository extends JpaRepository<LoHang,Long> {
}
