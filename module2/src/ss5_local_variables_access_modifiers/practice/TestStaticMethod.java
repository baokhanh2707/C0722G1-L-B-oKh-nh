package ss5_local_variables_access_modifiers.practice;

public class TestStaticMethod {
    public static void main(String[] args) {
        StaticMethod.change();
        StaticMethod s1 =new StaticMethod(1,"khánh");
        StaticMethod s2 =new StaticMethod(2,"vân");
        StaticMethod s3 =new StaticMethod(3,"huy");
        s1.display();
        s2.display();
        s3.display();

    }
}
