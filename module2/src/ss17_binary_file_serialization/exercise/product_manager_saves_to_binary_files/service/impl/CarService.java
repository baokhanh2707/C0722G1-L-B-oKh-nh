package ss17_binary_file_serialization.exercise.product_manager_saves_to_binary_files.service.impl;


import ss17_binary_file_serialization.exercise.product_manager_saves_to_binary_files.model.Car;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CarService implements ICarService {
    Scanner scanner = new Scanner(System.in);
    private static List<Car> CarList = new ArrayList<>();

    public Car infoCar() {
        System.out.println("nhập mã sản phẩm : ");
        int code = Integer.parseInt(scanner.nextLine());
        System.out.println("nhập tên sản phẩm : ");
        String name = scanner.nextLine();
        System.out.println("Mời nhập tên hãng sản xuất ");
        String manufacturer = scanner.nextLine();
        System.out.println("mời nhập giá sản phẩm");
        double price = Double.parseDouble(scanner.nextLine());
        Car car = new Car(code, name, manufacturer, price);
        return car;
    }

    @Override
    public void addCar() {
        Car car = this.infoCar();
        CarList.add(car);
        System.out.println("thêm mới thành công");
        writeFile(CarList);
    }

    private void writeFile(List<Car> carList) {
        ObjectOutputStream objectOutputStream = null;
        try {
            FileOutputStream fileOutputStream = new FileOutputStream("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss17_binary_file_serialization\\exercise\\product_manager_saves_to_binary_files\\data\\car.dat");
            objectOutputStream = new ObjectOutputStream(fileOutputStream);
            objectOutputStream.writeObject(carList);
        } catch (IOException e) {
            e.getStackTrace();
        }
        try {
            objectOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<Car> readFile() {
        ObjectInputStream objectInputStream = null;

        List<Car> carList = null;
        try {
            FileInputStream fileInputStream = new FileInputStream("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\ss17_binary_file_serialization\\exercise\\product_manager_saves_to_binary_files\\data\\car.dat");
            objectInputStream = new ObjectInputStream(fileInputStream);
           carList = (List<Car>) objectInputStream.readObject();

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        try {
            objectInputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return carList;
    }

    @Override
    public void displayCar() {
        CarList = readFile();
        for (Car car : CarList) {
            System.out.println(car.toString());
        }
    }

    @Override
    public void searchCar() {
        CarList= readFile();
        System.out.println("mời bạn nhập mã sản phẩm ");
        int code = Integer.parseInt(scanner.nextLine());
        for (int i = 0; i < CarList.size(); i++) {
            if (CarList.get(i).getCode() == (code)) {
                System.out.println(CarList.get(i));
            }
        }

    }

    public String getInfor(Car car) {
        return String.format("%s,%s,%s,%s", car.getCode(), car.getName(), car.getManufacturer(), car.getPrice());
    }
}


