package ss4_oop.exercise;

import java.util.Scanner;

public class QuadraticEquationClass {
    private  double a;
    private  double b;
    private  double c;

    public QuadraticEquationClass(double a, double b, double c) {

        this.a = a;
        this.b = b;
        this.c = c;
    }
    public double getA() {
        return a;
    }

    public double getB() {
        return b;
    }

    public double getC() {
        return c;
    }

    public double getDiscriminant() {
        return (this.b * this.b - 4 * this.a * this.c);
    }
    public double getRoot1(){
      return  ((-this.b + Math.sqrt(getDiscriminant()))/(2*this.a)) ;
    }
    public double getRoot2(){
        return ((-this.b-Math.sqrt(getDiscriminant()))/(2*this.a));
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("nhập số a");
        double a =scanner.nextDouble();
        System.out.println("nhập số b");
        double b =scanner.nextDouble();
        System.out.println("nhập số c");
        double c =scanner.nextDouble();
        QuadraticEquationClass quadraticEquation = new QuadraticEquationClass(a,b,c);
        System.out.println("delta = " + quadraticEquation.getDiscriminant());
        double delta=quadraticEquation.getDiscriminant();
        double r;
        double r1;
        double r2;
        if(delta>0){
            r1 = quadraticEquation.getRoot1();
            System.out.println("phương trình có nghiệm 1 là " +r1);
            r2 = quadraticEquation.getRoot2();
            System.out.println("phương trình có nghiệm 2 là " +r2);
        }
        else if(delta==0){
            r = quadraticEquation.getRoot1();
            System.out.println("phương trình có 1 nghiệm" + r);
        }else {
            System.out.println("The equation has no roots");
        }
    }
}
