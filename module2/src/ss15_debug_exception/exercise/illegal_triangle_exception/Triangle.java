package ss15_debug_exception.exercise.illegal_triangle_exception;

import java.util.Scanner;

public class Triangle {
    public static void main(String[] args) throws IllegalTriangleException {
        Scanner scanner = new Scanner(System.in);
        Triangle triangle = new Triangle();
        double edge1;
        double edge2;
        double edge3;
        while (true) {
            try {
                System.out.println("mời bạn nhập vào cạnh thứ nhất");
                edge1 = Double.parseDouble(scanner.nextLine());
                if (edge1 < 0) {
                    throw new IllegalTriangleException("độ dài cạnh không hợp lệ mời bạn nhập lại");
                }
                break;
            } catch (NumberFormatException e) {
                System.out.println("nhập sai định dạng mời nhập lại ");
            } catch (IllegalTriangleException e) {
                System.out.println(e.getMessage());
            }
        }
        while (true) {
            try {
                System.out.println("mời bạn nhập vào cạnh thứ hai");
                edge2 = Double.parseDouble(scanner.nextLine());
                if (edge2 < 0) {
                    throw new IllegalTriangleException("độ dài cạnh không hợp lệ mời bạn nhập lại");
                }
                break;
            } catch (NumberFormatException e) {
                System.out.println("nhập sai định dạng mời nhập lại ");
            } catch (IllegalTriangleException e) {
                System.out.println(e.getMessage());
            }
        }
        while (true) {
            try {
                System.out.println("mời bạn nhập vào cạnh thứ ba");
                edge3 = Double.parseDouble(scanner.nextLine());
                if (edge3 < 0) {
                    throw new IllegalTriangleException("độ dài cạnh không hợp lệ mời bạn nhập lại");
                }
                break;
            } catch (NumberFormatException e) {
                System.out.println("nhập sai định dạng mời nhập lại ");
            }catch (IllegalTriangleException e){
                System.out.println(e.getMessage());
            }
        }
        try {
            triangle.checkEdges(edge1, edge2, edge3);
        } catch (IllegalTriangleException e) {
            System.out.println(e.getMessage());
        }

    }

    private void checkEdges(double edge1, double edge2, double edge3) throws IllegalTriangleException {
        if (edge1 + edge2 <= edge3 || edge1 + edge3 <= edge2 || edge2 + edge3 <= edge1) {
            throw new IllegalTriangleException("tam giác không hợp lệ");
        } else {
            System.out.println("tam giác hợp lệ");
        }
    }
}

