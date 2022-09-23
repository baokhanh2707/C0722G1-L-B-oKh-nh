package ss14_sort_algorithm.exercise.install_insertion_sort_algorithm;

public class InsertionSort {
    static double[] arr = {1, 9, 4.5, 6.6, 5.7, -4.5};

    public static void insertSort(double[] arr) {
        for (int i = 0; i < arr.length; i++) {
            int key = (int) arr[i];
            int j;
            for (j = i - 1; j >= 0 && arr[j] > key; j--) {
                arr[j + 1] = arr[j];
            }
            arr[j + 1] = key;
        }
    }
    public static void main(String[] args) {
        insertSort(arr);
        for (int i = 0; i < arr.length; i++)
            System.out.print(arr[i] + " ");
    }
}

