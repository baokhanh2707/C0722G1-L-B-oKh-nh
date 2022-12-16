package com.example.baitap.service.impl;

import com.example.baitap.model.SuatChieu;
import com.example.baitap.repository.ISuatChieuRepository;
import com.example.baitap.service.ISuatChieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SuatChieuService implements ISuatChieuService {
    @Autowired
    private ISuatChieuRepository iSuatChieuRepository;


    @Override
    public Page<SuatChieu> finAll(Pageable pageable) {
        return iSuatChieuRepository.suatChieuPage(pageable);
    }

    @Override
    public SuatChieu save(SuatChieu suatChieu) {
        return iSuatChieuRepository.save(suatChieu);
    }

    @Override
    public void delete(String id) {
        iSuatChieuRepository.delete(id);
    }
}
