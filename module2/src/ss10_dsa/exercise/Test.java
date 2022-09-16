package ss10_dsa.exercise;

public class Test {
    public static class Student{
        private int id ;
        public String name ;

        public Student(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public Student() {
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static void main(String[] args)  {
        Student student =new Student(1,"huy");
        Student student1 =new Student(2,"vân");
        Student student2 =new Student(3,"khánh");
        Student student3 =new Student(4,"đạt");
        Student student4 =new Student(5,"công");
        MyArrayList<Student> studentMyArrayList =new MyArrayList<>();
        MyArrayList<Student> newMyArrayList =new MyArrayList<>();
        studentMyArrayList.add(student);
        studentMyArrayList.add(student1);
        studentMyArrayList.add(student2);
        studentMyArrayList.add(student3);
        studentMyArrayList.add(student4);
        studentMyArrayList.add(student,2);
        studentMyArrayList.size();
//            System.out.println(studentMyArrayList.size());
//            System.out.println(studentMyArrayList.get(5).getName());
//        System.out.println(studentMyArrayList.contains(student1));
        newMyArrayList = studentMyArrayList.clone();
        newMyArrayList.remove(1);
//        for (int i = 0; i <studentMyArrayList.size() ; i++) {
//            System.out.println(newMyArrayList.get(i).getName());
//        }
        System.out.println(student.getName());
        }
    }

