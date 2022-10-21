package furama_resort.models;

import java.time.LocalDate;

public class Booking  {
    private String codeBooking;//mã book
    private LocalDate startDay;
    private LocalDate endDay;
    private String codeCustomer;//mã khách hàng
    private String serviceCode;//mã dịch vụ
    private String typeOfService;//loại dịch vụ

    public Booking() {
    }

    public Booking(String codeBooking, LocalDate startDay, LocalDate endDay, String codeCustomer, String serviceName, String typeOfService) {
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

    public LocalDate getStartDay() {
        return startDay;
    }

    public void setStartDay(LocalDate startDay) {
        this.startDay = startDay;
    }

    public LocalDate getEndDay() {
        return endDay;
    }

    public void setEndDay(LocalDate endDay) {
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
