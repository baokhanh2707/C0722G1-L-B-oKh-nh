package furama_resort.models;

public class Contract {
    private int syncNumber ;
    private String codeBooking;
    private int advanceDepositAmount;
    private int totalPaymentAmount;
    private String codeCustomer;

    public Contract(int syncNumber, String codeBooking, int advanceDepositAmount, int totalPaymentAmount, String codeCustomer) {
        this.syncNumber = syncNumber;
        this.codeBooking = codeBooking;
        this.advanceDepositAmount = advanceDepositAmount;
        this.totalPaymentAmount = totalPaymentAmount;
        this.codeCustomer = codeCustomer;
    }

    public Contract() {
    }

    public int getSyncNumber() {
        return syncNumber;
    }

    public void setSyncNumber(int syncNumber) {
        this.syncNumber = syncNumber;
    }

    public String getCodeBooking() {
        return codeBooking;
    }

    public void setCodeBooking(String codeBooking) {
        this.codeBooking = codeBooking;
    }

    public int getAdvanceDepositAmount() {
        return advanceDepositAmount;
    }

    public void setAdvanceDepositAmount(int advanceDepositAmount) {
        this.advanceDepositAmount = advanceDepositAmount;
    }

    public int getTotalPaymentAmount() {
        return totalPaymentAmount;
    }

    public void setTotalPaymentAmount(int totalPaymentAmount) {
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
