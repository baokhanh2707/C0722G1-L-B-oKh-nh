package exercise_0.service;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Exception extends java.lang.Exception {

    public Exception(String message) {
        super(message);
    }

    public static String checkName() throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.println("mời bạn nhập tên vào đây");
        String name = scanner.nextLine();
        Pattern pattern = Pattern.compile("^([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$");
        Matcher matcher = pattern.matcher(name);
        if (!(matcher.matches())) {
            throw new Exception("tên không đúng địng dạng");
        }
        return name;
    }

    public static String checkCode() throws Exception {
        Scanner scanner = new Scanner((System.in));
        System.out.println("mời bạn nhập mã vào đây");
        String code = scanner.nextLine();
        Pattern pattern = Pattern.compile("[C][G][0-9]{3,6}");
        Matcher matcher = pattern.matcher(code);
        if (!(matcher.matches())) {
            throw new Exception("mã không đúng địng dạng");
        }
        return code;
    }

    public static String checkdateOfBirth() throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Mời nhập ngày sinh học sinh");
        String dateOfBirth = scanner.nextLine();
        Pattern pattern = Pattern.compile("^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$");
        Matcher matcher = pattern.matcher(dateOfBirth);
        if (!(matcher.matches())) {
            throw new Exception("Ngày sinh không đúng địng dạng");
        }
        return dateOfBirth;
    }
    public static String checkNameClass() throws Exception{
        Scanner scanner =new Scanner(System.in);
        System.out.println("Mời nhập lớp học sinh");
        String nameClass = scanner.nextLine();
        Pattern pattern = Pattern.compile("^C[0-9]{4}G[0-9]{1}$");
        Matcher matcher = pattern.matcher(nameClass);
        if (!(matcher.matches())) {
            throw new Exception("Lớp không đúng địng dạng");
        }
        return nameClass;
    }
    public static String checkSpecialize() throws Exception{
        Scanner scanner=new Scanner(System.in);
        System.out.print("Mời bạn nhập chuyên môn Giáo Viên: ");
        String specialize = scanner.nextLine();
        Pattern pattern = Pattern.compile("^([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$");
        Matcher matcher = pattern.matcher(specialize);
        if (!(matcher.matches())) {
            throw new Exception("chuyên môn  không đúng địng dạng");
        }
        return specialize;
    }
}

