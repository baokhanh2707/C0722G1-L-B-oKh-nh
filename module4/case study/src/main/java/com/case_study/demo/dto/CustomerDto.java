package com.case_study.demo.dto;

import com.case_study.demo.model.customer.CustomerType;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;


public class CustomerDto implements Validator {
    private Integer id;
    @NotEmpty(message = " không được rỗng")
    @Pattern(regexp = "^([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*[ ])*([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*)$", message = "Tên Khách Hàng không đúng định dạng")
    private String name;
    private String dateOfBirth;
    private String gender;
    @Pattern(regexp = "^[0-9]{9}|[0-9]{12}$",message = "số CMND không đúng định dạng")
    private String idCard;
    @Pattern(regexp = "^(090|091|(84)[+](90)|(84)[+](90)([0-9]){7})$", message = "Số điện thoại phải đúng định dạng")
    private String phoneNumber;
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Email chưa đúng định dạng(***@**.***)")
    private String email;
    private String address;
    private CustomerType customerType;

    public CustomerDto() {
    }

    public CustomerDto(Integer id, @NotEmpty(message = " không được rỗng") @Pattern(regexp = "^([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*[ ])*([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*)$", message = "Tên Khách Hàng không đúng định dạng") String name, String dateOfBirth, String gender, @Pattern(regexp = "^[0-9]{9}|[0-9]{12}") String idCard, @Pattern(regexp = "^(090|091|(84)[+](90)|(84)[+](90)+([0-9]){8})$", message = "Số điện thoại phải đúng định dạng") String phoneNumber, @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Email chưa đúng định dạng(***@**.***)") String email, String address, CustomerType customerType) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.idCard = idCard;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.customerType = customerType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
CustomerDto customerDto=(CustomerDto) target;
    }
}
