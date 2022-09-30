package ss17_binary_file_serialization.exercise.product_manager_saves_to_binary_files.model;

import java.io.Serializable;

public class Car implements Serializable {
    private int code;
    private String name;
    private String manufacturer ;
    private double price ;

    public Car() {
    }

    public Car(int code, String name, String manufacturer, double price) {
        this.code = code;
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" +
                "code=" + code +
                ", name='" + name + '\'' +
                ", manufacturer='" + manufacturer + '\'' +
                ", price=" + price +
                '}';
    }
}
