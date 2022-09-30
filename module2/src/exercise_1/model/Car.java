package exercise_1.model;

public class Car extends Vehicle {
    private int seatsNumber;
    private String typeCar;

    public Car() {
    }

    public Car(String licensePlate, String manufacturerCode, String manufacturerName, String nation, int producedYear, String owner, int seatsNumber, String typeCar) {
        super(licensePlate, manufacturerCode, manufacturerName, nation, producedYear, owner);
        this.seatsNumber = seatsNumber;
        this.typeCar = typeCar;
    }

    public Car(int seatsNumber, String typeCar) {
        this.seatsNumber = seatsNumber;
        this.typeCar = typeCar;
    }

    public Car(int code, String name, String manufacturer, double price) {
    }

    public int getSeatsNumber() {
        return seatsNumber;
    }

    public void setSeatsNumber(int seatsNumber) {
        this.seatsNumber = seatsNumber;
    }

    public String getTypeCar() {
        return typeCar;
    }

    public void setTypeCar(String typeCar) {
        this.typeCar = typeCar;
    }

    @Override
    public String toString() {
        return "Car{" +
                "seatsNumber=" + seatsNumber +
                ", typeCar='" + typeCar + '\'' +
                '}'+super.toString();
    }
}
