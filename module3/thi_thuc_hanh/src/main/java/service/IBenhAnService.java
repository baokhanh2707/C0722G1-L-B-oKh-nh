package service;

import model.BenhAn;

import java.util.List;

public interface IBenhAnService {
    List<BenhAn> finAll();
    boolean delete( int maBenhAn);
}
