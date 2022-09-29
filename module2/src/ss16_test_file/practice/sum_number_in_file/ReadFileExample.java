package ss16_test_file.practice.sum_number_in_file;

import com.sun.xml.internal.ws.api.model.wsdl.WSDLOutput;

import java.io.*;

public class ReadFileExample  {
    public static void main(String[] args) throws IOException {
        File file=new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss16_test_file\\practice\\sum_number_in_file\\Number.txt");
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader =new BufferedReader(fileReader);
        String line = "";
        int sum = 0;
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
            sum += Integer.parseInt(line);
        }
        System.out.println("Tổng ="+sum);
        bufferedReader.close();
    }
}
