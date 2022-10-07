package furama_resort.utils;

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

}
