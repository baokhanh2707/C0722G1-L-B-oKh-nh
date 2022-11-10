package repository.impl;

import model.Facility;
import repository.IFacilityRepository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FacilityRepository implements IFacilityRepository {
private final String SELECT_ALL= "call select_facility();";
private final String INSERT="INSERT INTO facility (`facility_id`, `facility_name`, `facility_area`, `facility_cost`, `facility_max_people`, `rent_type_id`, `facility_type_id`, `facility_standard_room`, `description_other_convenience`, `facility_pool_area`, `facility_number_of_floors`, `facility_free`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    @Override
    public List<Facility> findAll() {
        List<Facility> facilityList = new ArrayList<>();
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(SELECT_ALL);
            ResultSet rl = ps.executeQuery();
            while (rl.next()) {
                int id = rl.getInt("facility_id");
                String name = rl.getString("facility_name");
                int area = rl.getInt("facility_area");
                double cost = rl.getDouble("facility_cost");
                int maxPeople = rl.getInt("facility_max_people");
                int rentTypeId = rl.getInt("rent_type_id");
                int typeId = rl.getInt("facility_type_id");
                String standardRoom = rl.getString("facility_standard_room");
                String description = rl.getString("description_other_convenience");
                double poolArea = rl.getDouble("facility_pool_area");
                int numberOfFloors = rl.getInt("facility_number_of_floors");
                String text = rl.getString("facility_free");
                String typeName =rl.getString("facility_type_name");
                String rentTypeName =rl.getString("rent_type_name");
                Facility facility = new Facility(id, name, area, cost, maxPeople, rentTypeId, typeId, standardRoom, description, poolArea, numberOfFloors, text,typeName,rentTypeName);
                facilityList.add(facility);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return facilityList;
    }

    @Override
    public boolean add(Facility facility) {
        Connection connection = BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(INSERT);
            ps.setInt(1,facility.getId());
            ps.setString(2,facility.getName());
            ps.setInt(3,facility.getArea());
            ps.setDouble(4,facility.getCost());
            ps.setInt(5,facility.getMaxPeople());
            ps.setInt(6,facility.getRentTypeId());
            ps.setInt(7,facility.getTypeId());
            ps.setString(8,facility.getStandardRoom());
            ps.setString(9,facility.getDescription());
            ps.setDouble(10,facility.getPoolArea());
            ps.setInt(11,facility.getNumberOfFloors());
            ps.setString(12,facility.getText());
            return ps.executeUpdate()>0;

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        return false;
    }

    @Override
    public boolean edit(int id, Facility facility) {
        return false;
    }
}
