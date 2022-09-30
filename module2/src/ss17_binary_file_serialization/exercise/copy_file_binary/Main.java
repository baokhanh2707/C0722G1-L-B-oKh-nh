package ss17_binary_file_serialization.exercise.copy_file_binary;

import java.io.*;
import java.util.List;

public class Main implements Serializable {
    public static void main (String[] args) throws FileNotFoundException {
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss17_binary_file_serialization\\exercise\\copy_file_binary\\binary.dat");
            if (!file.exists()) {
                throw new FileNotFoundException("tệp nguồn không tồn tại");
            }
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject("aaaaaaaaaaaaaaaaa");
            objectOutputStream.close();
        } catch (FileNotFoundException e) {
            e.getMessage();
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            FileInputStream fileInputStream =new FileInputStream("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss17_binary_file_serialization\\exercise\\copy_file_binary\\binary.dat");
            FileOutputStream fileOutputStream=new FileOutputStream("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss17_binary_file_serialization\\exercise\\copy_file_binary\\copy.dat");
            ObjectOutputStream objectOutputStream=new ObjectOutputStream(fileOutputStream);
            ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
            String strings=(String) objectInputStream.readObject();
            objectOutputStream.writeObject(strings);
            long size=fileOutputStream.getChannel().size();
            System.out.println("số byte trong file là"+size);
            objectInputStream.close();
            objectOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

    }

}
