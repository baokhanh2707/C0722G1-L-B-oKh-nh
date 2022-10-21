package furama_resort.utils;

import java.time.LocalDate;

public class ExceptionPerson extends Exception {
    public ExceptionPerson(String message) {
        super(message);
    }
    public static void checkName(String name, String regex) throws ExceptionPerson {
        if (!name.matches(regex)) {
            throw new ExceptionPerson("Tên không đúng định dạng mời bạn nhập lại");
        }
    }

    public static void checkCode(String code, String regex) throws ExceptionPerson {
        if (!code.matches(regex)) {
            throw new ExceptionPerson("Mã không đúng định dạng mời bạn nhập lại");
        }
    }

    public static void checkGender(String gender, String regex) throws Exception {
        if (!gender.matches(regex)) {
            throw new ExceptionPerson("Giới tính không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkIdNumber(String idNumber) throws ExceptionPerson {
        if (!idNumber.matches("^[0-9]{12}$")) {
            throw new ExceptionPerson("Số CMND không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkPhoneNumber(String phoneNumber) throws ExceptionPerson {
        if (!phoneNumber.matches("^[0-9]{10}$")) {
            throw new ExceptionPerson("Số điện thoại không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkEmail(String email) throws ExceptionPerson {
        if (!email.matches("^[a-zA-Z0-9]+(@gmail.com|@gmail.com.vn)$")) {
            throw new ExceptionPerson("Email không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkWage(String wage) throws ExceptionPerson {
        if (!wage.matches("^[0-9]+$")) {
            throw new ExceptionPerson("bạn nhập lương không hợp lệ xin nhập lại");
        }
    }

    public static void checkAge(LocalDate dayOfBirth) throws ExceptionPerson {

        LocalDate presentDate = LocalDate.now().minusYears(18);
        LocalDate maxDate = LocalDate.now().minusYears(100);
        if (!dayOfBirth.isBefore(presentDate)) {
            throw new ExceptionPerson("Không được dưới 18 tuổi mời bạn nhập lại");
        } else if (!dayOfBirth.isAfter(maxDate)) {
            throw new ExceptionPerson("Không được trên 100 tuổi mời bạn nhập lại");
        }
    }

    public static void checkAddress(String address) throws ExceptionPerson {
        if (!address.matches("^(T|t)[ổ][ ][0-9]{1,3}[/](P|p)[h][ư][ờ][n][g][ ]+([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$")) {
            throw new ExceptionPerson("Bạn nhập sai địa chỉ mời bạn nhập lại ");
        }
    }
    public static void FebDateCheck(LocalDate birthday, String text) throws ExceptionPerson {
        if ((birthday.isLeapYear() && birthday.getMonthValue() == 2) && (text.contains("30/02") || text.contains("31/02"))) {
            throw new ExceptionPerson("Tháng 2 năm nhuận chỉ có 29 ngày.");
        } else if ((!birthday.isLeapYear() && birthday.getMonthValue() == 2) && (text.contains("30/02") || text.contains("29/02") || text.contains("31/02"))){
            throw new ExceptionPerson("Tháng 2 năm không nhuận chỉ có 28 ngày.");
        }
    }
}
