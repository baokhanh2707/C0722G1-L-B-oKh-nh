package repository;

import model.BenhAn;

import java.util.List;

public interface IBenhAnRepository {
List<BenhAn>finAll();
boolean delete( int maBenhAn);
}
