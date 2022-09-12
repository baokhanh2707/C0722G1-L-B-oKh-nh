package ss5_local_variables_access_modifiers.exercise.build_class_only_in_java;

public class Student {
    private String name ="john";
    private String classes ="CO2";

    public Student() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", classes='" + classes + '\'' +
                '}';
    }
}
