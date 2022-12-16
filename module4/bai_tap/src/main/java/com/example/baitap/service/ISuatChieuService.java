package com.example.baitap.service;

import com.example.baitap.model.SuatChieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface ISuatChieuService {
    Page<SuatChieu>finAll(Pageable pageable);
    SuatChieu save(SuatChieu suatChieu);
    void delete( String id);

}
