package furama_resort.models;

public class Villa extends Facility {
    private String roomStandard ;
    private String poolArea ;
    private String numberOfFloors ;

    public Villa() {
    }

    public Villa(String serviceName, String serviceCode, String usableArea, String rentalCosts, String maximumNumberOfPeople, String rentalType, String roomStandard, String poolArea, String numberOfFloors) {
        super(serviceName, serviceCode, usableArea, rentalCosts, maximumNumberOfPeople, rentalType);
        this.roomStandard = roomStandard;
        this.poolArea = poolArea;
        this.numberOfFloors = numberOfFloors;
    }

    public String getRoomStandard() {
        return roomStandard;
    }

    public void setRoomStandard(String roomStandard) {
        this.roomStandard = roomStandard;
    }

    public String getPoolArea() {
        return poolArea;
    }

    public void setPoolArea(String poolArea) {
        this.poolArea = poolArea;
    }

    public String getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(String numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    @Override
    public String toString() {
        return "Villa{" +
                "roomStandard='" + roomStandard + '\'' +
                ", poolArea=" + poolArea +
                ", numberOfFloors=" + numberOfFloors +
                '}'+ super.toString();
    }
}
