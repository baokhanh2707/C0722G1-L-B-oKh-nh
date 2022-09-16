package ss10_dsa.practice.list;

import java.util.Arrays;

public class List<E> {
    private int size = 0;
    private static final int DEFAULT_CAPACITY = 10;//phần tử đối đa trong danh sách mặc định là 10.
    private Object[] elements;

    public List() {
        elements = new Object[DEFAULT_CAPACITY];
    }

    private void ensuraCapa() {
        int newSize = elements.length * 2;//Tăng gấp đôi kích thước mảng chứa các phần tử
        elements = Arrays.copyOf(elements, newSize);
    }

    public void add(E e) {//thêm một phần tử vào cuối của danh sách
        if (size == elements.length) {
            ensuraCapa();
        }
        elements[size++] = e;
    }
    public E get (int i){
        if(i >=size|| i<0){
            throw new IndexOutOfBoundsException("index:"+i+",size"+i);
        }
        return (E)elements[i];
    }
}


