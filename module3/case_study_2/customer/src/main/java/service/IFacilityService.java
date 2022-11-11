package service;

import model.Facility;

import java.util.List;

public interface IFacilityService {
    List<Facility> findAll();
    boolean add(Facility facility);
    boolean delete(int id);
    boolean edit(int id , Facility facility);
    List<Facility> search(String name);
}
