package com.example.baitap.service;

import com.example.baitap.model.Phim;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPhimService {
    List<Phim>finAll();

}
