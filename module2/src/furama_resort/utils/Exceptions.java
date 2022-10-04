package furama_resort.utils;

public class Exceptions extends Exception {
    public Exceptions(String message) {
        super(message);
    }

    public static void checkName(String name, String regex) throws Exceptions {
        if (!name.matches(regex)) {
            throw new Exceptions("Tên không đúng định dạng mời bạn nhập lại");
        }
    }

    public static void checkCode(String code, String regex) throws Exceptions {
        if (!code.matches(regex)) {
            throw new Exceptions("Mã không đúng định dạng mời bạn nhập lại");
        }
    }

    public static void checkGender(String gender, String regex) throws Exceptions {
        if (!gender.matches(regex)) {
            throw new Exceptions("Giới tính không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkIdNumber(String idNumber) throws Exceptions {
        if (!idNumber.matches("^[0-9]{12}$")) {
            throw new Exceptions("Số CMND không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkPhoneNumber(String phoneNumber) throws Exceptions {
        if (!phoneNumber.matches("^[0-9]{10}$")){
            throw new Exceptions("Số điện thoại không hợp lệ mời bạn nhập lại");
        }
    }
    public static void checkEmail(String email)throws Exceptions{
        if(!email.matches("[A-Za-z0-9]{16}(@gmail.com|@gmail.com.vn)")){
            throw new Exceptions("Email không hợp lệ mời bạn nhập lại");
        }
    }
    public static void checkLevel(String level)throws Exceptions{
        if(!level.matches("^[1-4]{1}$")){
            throw new Exceptions("Bạn nhập không hợp lệ");
        }
    }
    public static void checkLocation(String location)throws Exceptions{
        if(!location.matches("^[1-6]{1}$")){
            throw new Exceptions("bạn nhập không hợp lệ xin nhập lại");
        }
    }
    public static void checkWage(String wage)throws Exceptions{
        if(!wage.matches("^[0-9]{9}$")){
            throw new Exceptions("bạn nhập lương không hợp lệ xin nhập lại");
        }
    }
//    public static void employeeAgeCheck(LocalDate birthday) throws CaseStudyFormatException {
//        LocalDate presentDate = LocalDate.now().plusYears(-18);
//        LocalDate maxDate = LocalDate.now().plusYears(-100);
//        if (!birthday.isBefore(presentDate) || !birthday.isAfter(maxDate)) {
//            throw new CaseStudyFormatException("Employee must not be under 18 or over 100 years old, please try again.");
//        } else System.out.println("Input Date of Birth Succeeded");
 //   }
}
