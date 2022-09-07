package ss2_loop_in_java.excercise;

import java.sql.SQLOutput;
import java.util.Scanner;

public class PrimeLessThan100 {
    public static void main(String[] args) {
      int number=100;
      int n =2;
      while (n<number){
          int  count=0;
          for (int i = 2; i <n ; i++) {
              if(n%i==0){
                  count=count +1;

              }
          }
          if(count==0){
              System.out.println(n);
          }
          n++;
      }
    }
}


