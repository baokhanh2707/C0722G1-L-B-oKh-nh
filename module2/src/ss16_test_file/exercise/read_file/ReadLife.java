package ss16_test_file.exercise.read_file;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ReadLife {
    public static void main(String[] args) throws IOException {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss16_test_file\\exercise\\read_file\\nation.txt");
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader =new BufferedReader(fileReader);
        String line;
        List<Nation> nationList=new ArrayList<>();
        while ((line = bufferedReader.readLine()) != null){
            String [] list=line.split(",");
            Nation nation = new Nation(Integer.parseInt(list[0]),list[1],list[2]);
            nationList.add(nation);
        }
        bufferedReader.close();
        for (Nation nation:nationList) {
            System.out.println(nation.getName());
        }
    }
}
