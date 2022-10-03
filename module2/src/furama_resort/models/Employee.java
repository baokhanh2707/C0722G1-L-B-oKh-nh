package furama_resort.models;

public class Employee extends Person {
    String level;
    String location;
    double wage ;

    public Employee(String code, String name, String dayOfBirth, String gender, int idNumber, int phoneNumber, String email, String level, String location, double wage) {
        super(code, name, dayOfBirth, gender, idNumber, phoneNumber, email);
        this.level = level;
        this.location = location;
        this.wage = wage;
    }

    public Employee() {
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getWage() {
        return wage;
    }

    public void setWage(double wage) {
        this.wage = wage;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "level='" + level + '\'' +
                ", location='" + location + '\'' +
                ", wage=" + wage +
                '}'+ super.toString();
    }
}
