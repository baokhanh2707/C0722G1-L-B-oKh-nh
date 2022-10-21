package furama_resort.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class ExceptionFacility extends Exception {
    public ExceptionFacility(String message) {
        super(message);
    }
    public static void checkServiceCode(String serviceCode,String regex)throws ExceptionFacility{
        if(!serviceCode.matches(regex)){
            throw new ExceptionFacility("Mã dịch vụ không đúng định dạng mời bạn nhập lại");
        }
    }
    public static void checkServiceName(String check)throws ExceptionFacility{
        if(!check.matches("^[A-Z][a-z]+$")){
            throw new ExceptionFacility("Tên dịch vụ không đúng định dạng mời bạn nhập lại");
        }
    }
    public static void checkStartDay(LocalDate starDay) throws ExceptionFacility {
        if (!starDay.isAfter(LocalDate.now()) && !starDay.equals(LocalDate.now())) {
            throw new ExceptionFacility("This date is incorrect!Please re-enter!");
        }
    }
    public static void checkDate(String str) throws ExceptionFacility {
         SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        simpleDateFormat.setLenient(false);

        try {
            simpleDateFormat.parse(str);
        } catch ( ParseException e) {
            throw new ExceptionFacility("Date Format Exception");
        }

    }
    public static void checkEndDay(LocalDate endDay, LocalDate startday) throws ExceptionFacility {
        if (!endDay.isAfter(startday) && !endDay.equals(startday)) {
            throw new ExceptionFacility("This date is incorrect!Please re-enter!");

        }
    }


}
