package furama_resort.models;

import java.time.LocalDate;

public class Customer extends Person  {
    private String typeOfGuest;
    private String address;

    public Customer(String code, String name, LocalDate dayOfBirth, String gender, String idNumber, String phoneNumber, String email, String typeOfGuest, String address) {
        super(code, name, dayOfBirth, gender, idNumber, phoneNumber, email);
        this.typeOfGuest = typeOfGuest;
        this.address = address;
    }

    public Customer() {
    }

    public String getTypeOfGuest() {
        return typeOfGuest;
    }

    public void setTypeOfGuest(String typeOfGuest) {
        this.typeOfGuest = typeOfGuest;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "typeOfGuest='" + typeOfGuest + '\'' +
                ", address='" + address + '\'' +
                '}'+super.toString();
    }
}
