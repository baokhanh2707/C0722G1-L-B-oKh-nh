package service.impl;

import model.BenhAn;
import repository.IBenhAnRepository;
import repository.impl.BenhAnRepository;
import service.IBenhAnService;

import java.util.List;

public class BenhAnService implements IBenhAnService {
private IBenhAnRepository benhAnRepository =new BenhAnRepository();
    @Override
    public List<BenhAn> finAll() {
        return benhAnRepository.finAll();
    }

    @Override
    public boolean delete(int maBenhAn) {
        return benhAnRepository.delete(maBenhAn);
    }
}
