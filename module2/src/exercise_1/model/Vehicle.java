package exercise_1.model;

public abstract class  Vehicle {
    private String licensePlate;
    private  String manufacturerCode;
    private  String manufacturerName;
    private String nation;
    private int producedYear;
    private String owner;

    public Vehicle(String licensePlate,String manufacturerCode,String manufacturerName,String nation, int producedYear, String owner) {
        this.licensePlate = licensePlate;
        this.manufacturerCode = manufacturerCode;
        this.manufacturerName = manufacturerName;
        this.nation=nation;
        this.producedYear = producedYear;
        this.owner = owner;
    }

    public Vehicle() {
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getManufacturerCode() {
        return manufacturerCode;
    }

    public void setManufacturer(String manufacturerCode) {
        this.manufacturerCode = manufacturerCode;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public int getProducedYear() {
        return producedYear;
    }

    public void setProducedYear(int producedYear) {
        this.producedYear = producedYear;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "licensePlate='" + licensePlate + '\'' +
                ", manufacturerCode='" + manufacturerCode + '\'' +
                ", manufacturerName='" + manufacturerName + '\'' +
                ", nation='" + nation + '\'' +
                ", producedYear=" + producedYear +
                ", owner='" + owner + '\'' +
                '}';
    }
}
