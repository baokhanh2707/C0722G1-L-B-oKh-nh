package ss5_local_variables_access_modifiers.practice;

public class StaticMethod {
private int id;
private String name;
private static String college;

    public StaticMethod(int id, String name) {
        this.id = id;
        this.name = name;
    }
    static void change(){
        college = "codegym";//thay đổi giá trị biến static
    }
    void display(){
        System.out.println(id+name+college);
    }
}