package furama_resort.utils;

import java.time.LocalDate;

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
        if (!phoneNumber.matches("^[0-9]{10}$")) {
            throw new Exceptions("Số điện thoại không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkEmail(String email) throws Exceptions {
        if (!email.matches("^[a-zA-Z0-9]+(@gmail.com|@gmail.com.vn)$")) {
            throw new Exceptions("Email không hợp lệ mời bạn nhập lại");
        }
    }

    public static void checkWage(String wage) throws Exceptions {
        if (!wage.matches("^[0-9]+$")) {
            throw new Exceptions("bạn nhập lương không hợp lệ xin nhập lại");
        }
    }

    public static void checkAge(LocalDate dayOfBirth) throws Exceptions {

        LocalDate presentDate = LocalDate.now().plusYears(-18);
        LocalDate maxDate = LocalDate.now().plusYears(-100);
        if (!dayOfBirth.isBefore(presentDate)) {
            throw new Exceptions("Không được dưới 18 tuổi mời bạn nhập lại");
        } else if (!dayOfBirth.isAfter(maxDate)) {
            throw new Exceptions("Không được trên 100 tuổi mời bạn nhập lại");
        } else System.out.println("Thêm thành công");
    }

    public static void checkAddress(String address) throws Exceptions {
        if (!address.matches("^(T|t)[ổ][ ][0-9]{1,3}[/](P|p)[h][ư][ờ][n][g][ ]+([A-ZĐ][a-záàảãạăâắằấầặẵẫêậéèẻẽẹếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+[ ])+[A-ZĐ][a-záàảãạăâắằấầặẵẫậéèẻẽẹếềểễệóòêỏõọôốồổỗộơớờởỡợíìỉĩịđùúủũụưứửữựỷỹ]+$")) {
            throw new Exceptions("Bạn nhập sai địa chỉ mời bạn nhập lại ");
        }
    }
}
