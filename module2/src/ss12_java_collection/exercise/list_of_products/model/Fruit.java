package ss12_java_collection.exercise.list_of_products.model;

public  class Fruit {
    private String code;
    private String name;
    private double price;

    public Fruit(String code, String name, double price) {
        this.code = code;
        this.name = name;
        this.price = price;
    }

    public Fruit() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Fruit{" +
                "code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
    }

