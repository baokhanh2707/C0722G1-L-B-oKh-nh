package model;

public class Product {
    private int numberId;
    private int idProduct;
    private String nameProduct;
    private double cost;

    public Product() {
    }

    public Product(int numberID, int idProduct, String nameProduct, double cost) {
        this.numberId = numberID;
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.cost = cost;
    }

    public int getNumberID() {
        return numberId;
    }

    public void setNumberID(int numberID) {
        this.numberId = numberID;
    }

    public int getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(int idProduct) {
        this.idProduct = idProduct;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
