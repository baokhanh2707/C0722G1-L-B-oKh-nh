package furama_resort.models;

public class Villa extends Facility {
    private String roomStandard ;
    private Double poolArea ;
    private int numberOfFloors ;

    public Villa() {
    }

    public Villa(String serviceName, String serviceCode, Double usableArea, int rentalCosts, int maximumNumberOfPeople, String rentalType, String roomStandard, Double poolArea, int numberOfFloors) {
        super(serviceName, serviceCode, usableArea, rentalCosts, maximumNumberOfPeople, rentalType);
        this.roomStandard = roomStandard;
        this.poolArea = poolArea;
        this.numberOfFloors = numberOfFloors;
    }

    public Villa(String roomStandard, Double poolArea, int numberOfFloors) {
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

    public Double getPoolArea() {
        return poolArea;
    }

    public void setPoolArea(Double poolArea) {
        this.poolArea = poolArea;
    }

    public int getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(int numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    @Override
    public String toString() {
        return "Villa{" +
                "roomStandard='" + roomStandard + '\'' +
                ", poolArea=" + poolArea +"m2" +
                ", numberOfFloors=" + numberOfFloors +
                '}'+ super.toString();
    }
}
