package exercise_1.service.impl_car;

import exercise_1.model.Car;
import exercise_1.model.Motorcycle;
import exercise_1.service.ICarService;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CarService implements ICarService {
    Scanner scanner =new Scanner(System.in);
    private static List<Car> CarList = new ArrayList<>();
    public  Car infoCar() {
        System.out.println("Mời nhập biển kiểm sát xe hơi : ");
        String licensePlate = scanner.nextLine();
        System.out.println("Mời nhập  mã hảng sản xuất : ");
        String manufacturerCode = scanner.nextLine();
        System.out.println("Mời nhập tên hãng sản xuất ");
        String manufacturesName = scanner.nextLine();
        System.out.println("Mời nhập tên quốc gia");
        String nation = scanner.nextLine();
        System.out.println("Mời nhập năm sản xuất");
        int producedYear = Integer.parseInt(scanner.nextLine());
        System.out.println("Mời nhập chủ sở hữu");
        String owner = scanner.nextLine();
        System.out.println("Mời bạn nhập số chỗ ngồi  ");
        int seatsNumber = Integer.parseInt(scanner.nextLine());
        System.out.println("mời bạn nhập kiểu xe");
        String typeCar=scanner.nextLine();
        Car car=new Car(licensePlate,manufacturerCode,manufacturesName,nation,producedYear,owner,seatsNumber,typeCar);
        return car;
    }

    @Override
    public void addCar() {
        Car car = this.infoCar();
        CarList.add(car);
        System.out.println("thêm mới thành công");

    }

    @Override
    public void displayCar() {
        for (Car car : CarList) {
            System.out.println(car);
        }

    }

    @Override
    public void removeCar() {
        System.out.println("mời bạn nhập biển kiểm sát xe máy ");
        String licensePlate = scanner.nextLine();
        boolean flagDelete = false;
        for (int i = 0; i < CarList.size(); i++) {
            if (CarList.get(i).getLicensePlate().equals(licensePlate)) {
                System.out.println("Bạn muốn xóa xe này không ? Nhập Y: yes, N: no ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    CarList.remove(i);
                    System.out.println("Xóa thành công!");
                }
                flagDelete = true;
                break;
            }
        }
        if (!flagDelete) {
            System.out.println("Không tìm thấy xe cần xóa!");
        }
    }

    @Override
    public void searchCar() {
        System.out.println("mời bạn nhập biển kiểm sát xe máy ");
        String licensePlate = scanner.nextLine();
        for (int i = 0; i < CarList.size(); i++) {
            if (CarList.get(i).getLicensePlate().contains(licensePlate)) {
                System.out.println(CarList.get(i));
            }
        }
    }
}
