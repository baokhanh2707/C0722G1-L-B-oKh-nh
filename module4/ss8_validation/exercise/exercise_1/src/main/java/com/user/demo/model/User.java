package com.user.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotEmpty(message = "first name không được rỗng")
    @Size(min = 5, max = 45, message = "first name phải dài hơn 5 và b=nhỏ hơn 45 ký tự")
    @Pattern(regexp = "^([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*[ ])*([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*)$", message = "Tên không đúng định dạng")
    private String firstName;
    @NotEmpty(message = "first name không được rỗng")
    @Size(min = 5, max = 45, message = "first name phải dài hơn 5 và b=nhỏ hơn 45 ký tự")
    @Pattern(regexp = "^([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*[ ])*([A-Z][a-záàảạãăắằặẵâấầẫậẩéèẻẽẹêếềểễệóòỏõọôốồổỗộơớờởỡợíìỉĩịùúủũụưứửữựỵỷỹýỳ]*)$", message = "Tên không đúng định dạng")
    private String lastName;
    @Pattern(regexp = "0[0-9]{9}", message = "Số phải đúng định dạng 09********")
    private String phoneNumber;
    @Min(value = 17, message = "Tuổi phải lớn hơn hoặc bằng 18 tuổi")
    private int age;
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Email chưa đúng định dạng(***@**.***)")
    private String email;

    public User() {
    }

    public User(int id, @NotEmpty @Size(min = 2, max = 45, message = "name có độ dài tối thiểu là 5 và có tối đa 45 ký tự") String firstName, @NotEmpty @Size(min = 2, max = 45, message = "name có độ dài tối thiểu là 5 và có tối đa 45 ký tự") String lastName, @Pattern(regexp = "0[0-9]{9}", message = "Số phải đúng định dạng 09********") String phoneNumber, @Min(value = 17, message = "Tuổi phải lớn hơn hoặc bằng 18 tuổi") int age, @Pattern(regexp = "^[a-z]{5,30}(@gmail.com)$", message = "email không đúng địng dạng") String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

