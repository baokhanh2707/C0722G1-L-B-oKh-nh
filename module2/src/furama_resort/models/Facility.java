package furama_resort.models;

public abstract class  Facility {
    private String serviceName;
    private String usableArea;
    private String rentalCosts;
    private String maximumNumberOfPeople;
    private String rentalType;  //theo tháng năm ngày giờ
    private String serviceCode;

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }



    public Facility(String serviceName,String serviceCode, String usableArea, String rentalCosts, String maximumNumberOfPeople, String rentalType) {
        this.serviceName = serviceName;
        this.serviceCode=serviceCode;
        this.usableArea = usableArea;
        this.rentalCosts = rentalCosts;
        this.maximumNumberOfPeople = maximumNumberOfPeople;
        this.rentalType = rentalType;
    }

    public Facility() {
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getUsableArea() {
        return usableArea;
    }

    public void setUsableArea(String usableArea) {
        this.usableArea = usableArea;
    }

    public String getRentalCosts() {
        return rentalCosts;
    }

    public void setRentalCosts(String rentalCosts) {
        this.rentalCosts = rentalCosts;
    }

    public String getMaximumNumberOfPeople() {
        return maximumNumberOfPeople;
    }

    public void setMaximumNumberOfPeople(String maximumNumberOfPeople) {
        this.maximumNumberOfPeople = maximumNumberOfPeople;
    }

    public String getRentalType() {
        return rentalType;
    }

    public void setRentalType(String rentalType) {
        this.rentalType = rentalType;
    }

    @Override
    public String toString() {
        return "Facility{" +
                "serviceName='" + serviceName + '\'' +
                ", usableArea=" + usableArea +
                ", rentalCosts=" + rentalCosts +
                ", maximumNumberOfPeople=" + maximumNumberOfPeople +
                ", rentalType=" + rentalType +
                ", serviceCode='" + serviceCode + '\'' +
                '}';
    }
}
