import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class fabo<n> {
//        public static void countCharacters(String str) {
//        int[] charCount = new int[256]; // Mảng lưu trữ số lần xuất hiện của mỗi ký tự
//
//        for (int i = 0; i < str.length(); i++) {
//            charCount[str.charAt(i)]++; // Tăng giá trị của phần tử tương ứng với ký tự đó trong mảng charCount
//        }
//        // In kết quả
//        System.out.println("Số lần xuất hiện của mỗi ký tự trong chuỗi:");
//        for (int i = 0; i < 256; i++) {
//            if (charCount[i] > 0) {
//                System.out.println((char)i + ": " + charCount[i]);
//            }
//        }
//    }
//    public static void main(String[] args) {
//        String str = "aaba   csdc";
//        countCharacters(str);
//    }

    //    public static boolean soNguyenTo(int n) {
//        for (int i = 2; i < n; i++) {
//            if (n % i == 0) {
//                return false;
//            }
//        }
//        return true;
//    }
//
//    public static void main(String[] args) {
//        int count = 0;
//        int number = 2;
//        while (count != 20) {
//            if (soNguyenTo(number)) {
//                System.out.println(number);
//                count++;
//            }
//            number++;
//        }
//
//    }
//    public static void main(String[] args) {
//
//
//    int n = 100; // Giả sử cần tính tổng các số nguyên tố từ 1 đến 100
//    int sum = 0;
//
//        for(int i = 2; i <= n; i++)
//    {
//        if (isPrime(i)) {
//            sum += i;
//        }
//    }
//
//        System.out.println("Tổng các số nguyên tố từ 1 đến "+n +" là "+sum);
//}
//
//    // Hàm kiểm tra số nguyên dương n có phải là số nguyên tố hay không
//    public static boolean isPrime(int n) {
//        if (n <= 1) {
//            return false;
//        }
//
//        for (int i = 2; i <= Math.sqrt(n); i++) {
//            if (n % i == 0) {
//                return false;
//            }
//        }
//
//        return true;
//    }
//    public static void main(String[] args) {
//          int[] arr= {1, 3, 4, 6,7,8,0,5,4,3,2,0};
//        Scanner scanner = new Scanner(System.in);
//        System.out.println("Nhập N");
//        int n = scanner.nextInt() ;
//        for (int i = 0; i < arr.length; i++) {
//            for (int j = i+1; j < arr.length; j++) {
//                if(arr[i]+ arr[j] == n){
//                    System.out.println(i + "-" +j);
//                }
//            }
//        }
//    public static void main(String[] args) {
//        Scanner scanner = new Scanner(System.in);
//        System.out.println("Nhập dãy chữ số La Mã(chỉ sử dụng I,V,X,L,C,D,M): ");
//        String str = scanner.nextLine();
//
//        int[] arr = new int[str.length()];
//
//        for (int i = 0; i < str.length(); i++) {
//            switch (str.charAt(i)) {
//                case 'I':
//                    arr[i] = 1;
//                    break;
//                case 'V':
//                    arr[i] = 5;
//                    break;
//                case 'X':
//                    arr[i] = 10;
//                    break;
//                case 'L':
//                    arr[i] = 50;
//                    break;
//                case 'C':
//                    arr[i] = 100;
//                    break;
//                case 'D':
//                    arr[i] = 500;
//                    break;
//                case 'M':
//                    arr[i] = 1000;
//                    break;
//                default:
//                    System.out.println("Số La Mã bạn nhập không đúng!");
//                    System.exit(0);
//            }
//        }
//
//        int num = arr[arr.length - 1];
//        for (int i = arr.length - 1; i > 0; i--) {
//            int x = arr[i] - arr[i - 1];
//            if (x == 4 || x == 9 || x == 40 || x == 90 || x == 400 || x == 900) {
//                num -= arr[i - 1];
//            } else if (x <= 0) {
//                num += arr[i - 1];
//            } else {
//                System.out.println("Số La Mã bạn nhập không đúng!=");
//                System.exit(0);
//            }
//        }
//        System.out.println("Kết quả: " + num);
//    }
//    public static void main(String[] args) {
//        Scanner scanner = new Scanner(System.in);
//        System.out.println("Nhập number");
//        int temp = scanner.nextInt();
//        String result = "";
//        while (temp > 0) {
//            result = temp % 8 + result;
//            temp = temp / 8;
//        }
//        System.out.println(result);
//    }


    //        public static void main(String[] args) {
//            String string = "anh có có anh em anh";
//            Map<String, Integer> wordCount = new HashMap<>();
//            String[] words = string.split(" ");
//
//            for (String word : words) {
//                if (!wordCount.containsKey(word)) {
//                    wordCount.put(word, 1);
//                } else {
//                    wordCount.put(word, wordCount.get(word) + 1);
//                }
//            }
//
//            for (String word : wordCount.keySet()) {
//                System.out.println(word + " xuất hiện" + wordCount.get(word) + " lần");
//            }
//        }
//    public static void main(String[] args) {
//        Scanner scanner = new Scanner(System.in);
//        int n = scanner.nextInt();
//        int result=0;
//        while (n!=0){
//          int temp=n%10;
//          result=result*10+temp;
//          n=n/10;
//        }
//        System.out.println(result);

//
//    public static void main(String[] args) {
//
//
//        int[] number = {2, 5, 7, 23, 63};
//        int sum = 0;
//        int max=number[0];
//        int min=number[0];
//        for (int i = 0; i < number.length; i++) {
//            sum+=number[i];
//            if(number[i]>max){
//                max=number[i];
//            }
//            if(number[i]<min){
//                min=number[i];
//            }
//        }
//        System.out.println("tong 4 so nhỏ nhất la: "+(sum -max) );
//        System.out.println("tong 4 so lớn nhất la: "+(sum -min) );
//}
//
//
//    public static void main(String[] args) {
//        int[] number = {2, 5, 7, 23, 63, 63, 93};
//        int max = number[0];
//        int max2 = number[0];
//
//        for (int i = 0; i < number.length; i++) {
//            if (number[i] > max) {
//                max = number[i];
//            }
//        }
//        for (int i = 0; i < number.length; i++) {
//            if (number[i] > max2 & number[i] < max) {
//                max2 = number[i];
//            }
//        }
//        System.out.println(max2);
//    }
//public static void main(String[] args) {
//    String str = "baccasc";
//    char[] string = str.toCharArray();
//    System.out.println(string[3]);
//    for (int i = 0; i < string.length - 1; i++) {
//        for (int j = i + 1; j < string.length; j++) {
//            if (string[i] > string[j]) {
//                char temp = string[i];
//                string[i] = string[j];
//                string[j] = temp;
//            }
//        }
//    }
//    String result = new String(string);
//    System.out.println(result);
//}

//    public static void main(String[] args) {
//        String str = "abcdefgh";
//        char[] chars = str.toCharArray();
//        String result = "";
//        for (int i = chars.length-1 ; i >= 0; i--) {
//            result += chars[i];
//        }
//        System.out.println("Chuỗi đảo ngược là : " + result);
//    }
//public static void main(String[] args) {
//            Scanner scanner = new Scanner(System.in);
//            System.out.println("Mời nhập độ dài: ");
//            int height = scanner.nextInt();
//
//            for (int i = 1; i <= height; i++) {
//                for (int j = 1; j <= height - i; j++) {
//                    System.out.print(" ");
//                }
//                for (int k = 1; k <= 2 * i - 1; k++) {
//                    System.out.print("*");
//                }
//                System.out.println();
//            }
//        }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 2, 1};
        boolean isSymmetric = true;
        for (int i = 0; i < arr.length / 2; i++) {
            if (arr[i] != arr[arr.length - i - 1]) {
                isSymmetric = false;
                break;
            }
        }
        if (isSymmetric) {
            System.out.println("Mang la mang doi xung.");
        } else {
            System.out.println("Mang khong doi xung.");
        }
    }

}



