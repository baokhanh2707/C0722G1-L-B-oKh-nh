package furama_resort.models;

public class Contract {
    private String syncNumber ;
    private String codeBooking;
    private String advanceDepositAmount;
    private String totalPaymentAmount;
    private String codeCustomer;

    public Contract(String syncNumber, String codeBooking, String advanceDepositAmount, String totalPaymentAmount, String codeCustomer) {
        this.syncNumber = syncNumber;
        this.codeBooking = codeBooking;
        this.advanceDepositAmount = advanceDepositAmount;
        this.totalPaymentAmount = totalPaymentAmount;
        this.codeCustomer = codeCustomer;
    }

    public Contract() {
    }

    public String getSyncNumber() {
        return syncNumber;
    }

    public void setSyncNumber(String syncNumber) {
        this.syncNumber = syncNumber;
    }

    public String getCodeBooking() {
        return codeBooking;
    }

    public void setCodeBooking(String codeBooking) {
        this.codeBooking = codeBooking;
    }

    public String getAdvanceDepositAmount() {
        return advanceDepositAmount;
    }

    public void setAdvanceDepositAmount(String advanceDepositAmount) {
        this.advanceDepositAmount = advanceDepositAmount;
    }

    public String getTotalPaymentAmount() {
        return totalPaymentAmount;
    }

    public void setTotalPaymentAmount(String totalPaymentAmount) {
        this.totalPaymentAmount = totalPaymentAmount;
    }

    public String getCodeCustomer() {
        return codeCustomer;
    }

    public void setCodeCustomer(String codeCustomer) {
        this.codeCustomer = codeCustomer;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "syncNumber=" + syncNumber +
                ", codeBooking='" + codeBooking + '\'' +
                ", advanceDepositAmount=" + advanceDepositAmount +
                ", totalPaymentAmount=" + totalPaymentAmount +
                ", codeCustomer='" + codeCustomer + '\'' +
                '}';
    }
}
