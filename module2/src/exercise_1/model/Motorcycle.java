package exercise_1.model;

public class Motorcycle extends Vehicle {
    private double Wattage;

    public Motorcycle(String licensePlate, String manufacturerCode, String manufacturerName, String nation, int producedYear, String owner, double wattage) {
        super(licensePlate, manufacturerCode, manufacturerName, nation, producedYear, owner);
        Wattage = wattage;
    }

    public Motorcycle(double wattage) {
        Wattage = wattage;
    }

    public Motorcycle() {
    }

    public double getWattage() {
        return Wattage;
    }

    public void setWattage(double wattage) {
        Wattage = wattage;
    }

    @Override
    public String toString() {
        return "Motorcycle{" +
                "Wattage=" + Wattage +
                '}'+super.toString();
    }
}
