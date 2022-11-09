package repository.impl;

import javafx.scene.chart.AxisBuilder;
import model.Facility;
import repository.IFacilityRepository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FacilityRepository implements IFacilityRepository {
    private final String SELECT_ALL = "select*from facility;";

    @Override
    public List<Facility> findAll() {
        List<Facility>facilityList=new ArrayList<>();
        Connection connection =BaseRepository.getConnectDB();
        try {
            PreparedStatement ps = connection.prepareStatement(SELECT_ALL);
            ResultSet rl= ps.executeQuery();
            while (rl.next()){
                int id =rl.getInt("facility_id");
                String name = rl.getString("facility_name");
                int area = rl.getInt("facility_area");
                double cost = rl.getDouble("facility_cost");
                int maxPeople = rl.getInt("facility_max_people");
                int rentTypeId=rl.getInt("rent_type_id");
                int typeId=rl.getInt("facility_type_id");
                String standardRoom=rl.getString("facility_standard_room");
                String description=rl.getString("description_other_convenience");
                double poolArea = rl.getDouble("facility_pool_area");
                int numberOfFloors=rl.getInt("facility_number_of_floors");
                String text = rl.getString("facility_free");
                Facility facility =new Facility(id,name,area,cost,maxPeople,rentTypeId,typeId,standardRoom,description,poolArea,numberOfFloors,text);
                facilityList.add(facility);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return facilityList;
    }

    @Override
    public boolean add(Facility facility) {
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
