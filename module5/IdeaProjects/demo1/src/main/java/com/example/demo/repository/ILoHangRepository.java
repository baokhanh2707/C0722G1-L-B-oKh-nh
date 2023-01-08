package com.example.demo.repository;

import com.example.demo.model.LoHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ILoHangRepository extends JpaRepository<LoHang,Long> {
    @Query(value = "select * from lo_hang l join san_pham s on l.ten_san_pham_id = s.id", countQuery = "select * from lo_hang l join san_pham s on l.ten_san_pham_id = s.id", nativeQuery = true)
    List<LoHang> getAllLoHang();

    @Query(value = "select * from lo_hang where id= :id", countQuery = "select * from lo_hang where id= :id", nativeQuery = true)
    LoHang findByIdLoHang(@Param("id") Long id);

}
