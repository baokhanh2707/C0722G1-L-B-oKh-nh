package ss16_test_file.exercise.copy_file;

import ss10_dsa_list.practice.list.List;

import java.io.*;

public class CopyFile {
    public static void main(String[] args) throws IOException {
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss16_test_file\\exercise\\copy_file\\source.txt");
            File file1 = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss16_test_file\\exercise\\copy_file\\target.txt");
            FileReader fileReader = new FileReader(file);
            FileWriter fileWriter = new FileWriter(file1);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            int sum = 0;
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                for (int i = 0; i < line.length(); i++) {
                    if (line.charAt(i) != ' ') {
                        sum += 1;
                    }
                }
                    bufferedWriter.write(line);
                    bufferedWriter.newLine();
            }
            bufferedWriter.write("tổng các kí tự là =" + sum);

            bufferedReader.close();
            bufferedWriter.close();
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());;
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}
