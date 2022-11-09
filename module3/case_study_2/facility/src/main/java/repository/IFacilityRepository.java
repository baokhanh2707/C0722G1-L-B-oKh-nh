package repository;

import model.Facility;

import java.util.List;

public interface IFacilityRepository {
    List<Facility>findAll();
    boolean add(Facility facility);
    boolean delete(int id);
    boolean edit(int id , Facility facility);

}
