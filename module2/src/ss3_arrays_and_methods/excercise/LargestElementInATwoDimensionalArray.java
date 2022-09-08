package ss3_arrays_and_methods.excercise;

public class LargestElementInATwoDimensionalArray {
    public static void main(String[] args) {
        int[][] array = {{3, 4, 5,}, {6, 7, 8}};
        int max = array[0][0];
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                if (max < array[i][j]) ;
                max = array[i][j];
            }
        }
        System.out.println("số lớn nhất là " + max);
    }
}
