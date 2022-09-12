package ss5_local_variables_access_modifiers.exercise.build_class_only_in_java;

import ss5_local_variables_access_modifiers.exercise.build_class_only_in_java.Student;

public class TestStudent {
    public static void main(String[] args) {
        Student student = new Student();
        student.setName("khánh");
        student.setClasses("C0722G1");
        System.out.println(student.toString());
        Student student1 =new Student();
        student1.setName("vân");
        System.out.println(student1.toString());

    }
}
