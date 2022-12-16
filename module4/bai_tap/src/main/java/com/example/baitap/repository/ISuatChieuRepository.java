package com.example.baitap.repository;

import com.example.baitap.model.SuatChieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ISuatChieuRepository extends JpaRepository<SuatChieu,String> {
    @Query(value="select * from suat_chieu as s where s.flag_delete = false "
            ,countQuery = "select * from (suat_chieu as s where s.flag_delete = false) as u",nativeQuery=true)
    Page<SuatChieu> suatChieuPage(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update suat_chieu s set s.flag_delete = true where s.id = :id", nativeQuery = true)
    void delete(@Param("id") String id);
}
