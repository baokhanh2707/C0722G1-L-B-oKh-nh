package com.example.thi.repository;

import com.example.thi.model.CanCuoc;
import com.example.thi.model.ThongTinMuon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICanCuocRepository extends JpaRepository<ThongTinMuon,Long> {
@Query(value = "select * from can_cuoc",nativeQuery = true)
    Page<CanCuoc>pageCanCuoc(Pageable pageable);
}
