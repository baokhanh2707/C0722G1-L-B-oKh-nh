package furama_resort.models;

public class Employee extends Person {
    String level;
    String location;
    String wage;

    public Employee(String code, String name, String dayOfBirth, String gender, String idNumber, String phoneNumber, String email, String level, String location, String wage) {
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

    public String getWage() {
        return wage;
    }

    public void setWage(String wage) {
        this.wage = wage;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "level='" + level + '\'' +
                ", location='" + location + '\'' +
                ", wage=" + wage +
                '}' + super.toString();
    }
}