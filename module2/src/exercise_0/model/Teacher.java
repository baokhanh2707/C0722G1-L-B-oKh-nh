package exercise_0.model;

public class Teacher extends Person {
private String specialize;

    public Teacher(String code, String name, String dateOfBirth, Boolean gender, String specialize) {
        super(code, name, dateOfBirth, gender);
        this.specialize = specialize;
    }

    public Teacher(String specialize) {
        this.specialize = specialize;
    }

    public Teacher() {
    }

    public String getSpecialize() {
        return specialize;
    }

    public void setSpecialize(String specialize) {
        this.specialize = specialize;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "specialize='" + specialize + '\'' +
                '}'+super.toString();
    }
}
