package furama_resort.models;

public class House extends Facility {
    private String roomStandard ;
    private String numberOfFloors ;

    public House(String serviceCode, String roomStandard, String numberOfFloors) {
        super(serviceCode);
        this.roomStandard = roomStandard;
        this.numberOfFloors = numberOfFloors;
    }

    public House(String serviceName, String usableArea, String rentalCosts, String maximumNumberOfPeople, String rentalType, String roomStandard, String numberOfFloors) {
        super(serviceName, usableArea, rentalCosts, maximumNumberOfPeople, rentalType);
        this.roomStandard = roomStandard;
        this.numberOfFloors = numberOfFloors;
    }

    public House(String roomStandard, String numberOfFloors) {
        this.roomStandard = roomStandard;
        this.numberOfFloors = numberOfFloors;
    }

    public String getRoomStandard() {
        return roomStandard;
    }

    public void setRoomStandard(String roomStandard) {
        this.roomStandard = roomStandard;
    }

    public String getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(String numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    @Override
    public String toString() {
        return "House{" +
                "roomStandard='" + roomStandard + '\'' +
                ", numberOfFloors=" + numberOfFloors +
                '}'+super.toString();
    }
}

