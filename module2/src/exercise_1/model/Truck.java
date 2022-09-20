package exercise_1.model;

public class Truck extends Vehicle {
    private double tonnage;

    public Truck(String licensePlate, String manufacturerCode, String manufacturerName, String nation, int producedYear, String owner, double tonnage) {
        super(licensePlate, manufacturerCode, manufacturerName, nation, producedYear, owner);
        this.tonnage = tonnage;
    }

    public Truck(double tonnage) {
        this.tonnage = tonnage;
    }

    public Truck() {
    }

    public double getTonnage() {
        return tonnage;
    }

    public void setTonnage(double tonnage) {
        this.tonnage = tonnage;
    }

    @Override
    public String toString() {
        return "Truck{" +
                "tonnage=" + tonnage +
                '}'+super.toString();
    }
}
