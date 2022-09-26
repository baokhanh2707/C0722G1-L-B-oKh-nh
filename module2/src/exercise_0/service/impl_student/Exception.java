package exercise_0.service.impl_student;

public class Exception extends java.lang.Exception {
    public Exception(String message) {
        super(message);
    }

    public static void checkName(String name) throws Exception {
        for (int i = 0; i < name.length(); i++) {
            if (name.charAt(0) < 65 || name.charAt(0) > 90 || name.charAt(i) <= '9' && name.charAt(i) >='0') {
                throw new Exception("tên không đúng địng dạng");
            }
        }
    }
}
