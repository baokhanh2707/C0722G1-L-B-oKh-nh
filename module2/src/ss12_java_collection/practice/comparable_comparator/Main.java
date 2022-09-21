package ss12_java_collection.practice.comparable_comparator;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Student student = new Student("Kien", 30, "HT");
        Student student1 = new Student("Nam", 26, "HN");
        Student student2 = new Student("Anh", 38, "HT" );
        Student student3 = new Student("Tung", 38, "HT" );

       List<Student> oraa = new ArrayList<>();
        oraa.add(student);
        oraa.add(student1);
        oraa.add(student2);
        oraa.add(student3);
        Collections.sort(oraa);
        for(Student st : oraa){
            System.out.println(st.toString());

        }

        AgeComparator ageComparator = new AgeComparator();
        Collections.sort(oraa,ageComparator);
        System.out.println("So sanh theo tuoi:");
        for(Student st : oraa){
            System.out.println(st.toString());
        }
    }
}
