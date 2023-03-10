
public class  hac {
    private  int number;
    private  String name;

    public hac(int number, String name) {
        this.number = number;
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public String getName() {
        return name;
    }
}










//    static void DemKyTu(String str) {
//        int counter[] = new int[256];
//        int len = str.length();
//        for (int i = 0; i < len; i++)
//            counter[str.charAt(i)]++;
//        char array[] = new char[str.length()];
//        for (int i = 0; i < len; i++) {
//            array[i] = str.charAt(i);
//            int flag = 0;
//            for (int j = 0; j <= i; j++) {
//                if (str.charAt(i) == array[j])
//                    flag++;
//            }
//            if (flag == 1)
//                System.out.println("Số lần xuất hiện của " + str.charAt(i)
//                        + " trong chuỗi:" + counter[str.charAt(i)]);
//        }
//    }
//
//    public static void main(String[] args) {
//        Scanner scanner =new Scanner(System.in);
//        System.out.println("Mời bạn nhập chuỗi cần kiểm tra vào đây");
//        String str = scanner.nextLine();
//        System.out.println("Chuỗi là: " + str);
//        DemKyTu(str);
//    }
//}

