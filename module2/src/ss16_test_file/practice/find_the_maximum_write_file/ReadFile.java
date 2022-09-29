package ss16_test_file.practice.find_the_maximum_write_file;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ReadFile {
    public static void main(String[] args) throws IOException {
        File file = new File("D:/C0722G1-L-B-oKh-nh/module2/src/ss16_test_file/practice/find_the_maximum_write_file/Number.txt");
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        String line;
        int max = Integer.parseInt(bufferedReader.readLine());
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
            if (Integer.parseInt(line) > max) {
                max = Integer.parseInt(line);
            }
        }
        System.out.println("max = " + max);
        bufferedReader.close();
    }
}


