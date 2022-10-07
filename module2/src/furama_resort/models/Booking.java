package furama_resort.models;

public class Booking  {
    private String codeBooking;//mã book
    private int startDay;
    private int endDay;
    private String codeCustomer;//mã khách hàng
    private String serviceCode;//mã dịch vụ
    private String typeOfService;//loại dịch vụ

    public Booking() {
    }

    public Booking(String codeBooking, int startDay, int endDay, String codeCustomer, String serviceName, String typeOfService) {
        this.codeBooking = codeBooking;
        this.startDay = startDay;
        this.endDay = endDay;
        this.codeCustomer = codeCustomer;
        this.serviceCode = serviceName;
        this.typeOfService = typeOfService;
    }

    public String getCodeBooking() {
        return codeBooking;
    }

    public void setCodeBooking(String codeBooking) {
        this.codeBooking = codeBooking;
    }

    public int getStartDay() {
        return startDay;
    }

    public void setStartDay(int startDay) {
        this.startDay = startDay;
    }

    public int getEndDay() {
        return endDay;
    }

    public void setEndDay(int endDay) {
        this.endDay = endDay;
    }

    public String getCodeCustomer() {
        return codeCustomer;
    }

    public void setCodeCustomer(String codeCustomer) {
        this.codeCustomer = codeCustomer;
    }

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getTypeOfService() {
        return typeOfService;
    }

    public void setTypeOfService(String typeOfService) {
        this.typeOfService = typeOfService;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "codeBooking='" + codeBooking + '\'' +
                ", startDay='" + startDay + '\'' +
                ", endDay='" + endDay + '\'' +
                ", codeCustomer='" + codeCustomer + '\'' +
                ", serviceName='" + serviceCode + '\'' +
                ", typeOfService='" + typeOfService + '\'' +
                '}';
    }
}
