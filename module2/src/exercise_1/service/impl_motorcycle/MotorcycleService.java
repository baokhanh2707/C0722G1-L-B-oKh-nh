package exercise_1.service.impl_motorcycle;

import exercise_1.model.Motorcycle;
import exercise_1.model.Vehicle;
import exercise_1.service.ICarService;
import exercise_1.service.IMotorcycleService;
import exercise_1.service.impl_car.CarService;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MotorcycleService implements IMotorcycleService {
    private static Scanner scanner = new Scanner(System.in);
    private static List<Motorcycle> MotorcycleList = new ArrayList<>();

    public Motorcycle infoMotorcycle() {
        System.out.println("Mời nhập biển kiểm sát: ");
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
        System.out.println("Mời bạn nhập công suất ");
        double wattage = Double.parseDouble(scanner.nextLine());
        Motorcycle motorcycle = new Motorcycle(licensePlate, manufacturerCode, manufacturesName, nation, producedYear, owner, wattage);
        return motorcycle;
    }

    @Override
    public void addMotorcycle() {
        Motorcycle motorcycle = this.infoMotorcycle();
        MotorcycleList.add(motorcycle);
        System.out.println("thêm mới thành công");
    }

    @Override
    public void displayMotorcycle() {
        for (Motorcycle motorcycle : MotorcycleList) {
            System.out.println(motorcycle);
        }
    }

    @Override
    public void removeMotorcycle() {
        System.out.println("mời bạn nhập biển kiểm sát xe máy ");
        String licensePlate = scanner.nextLine();
        boolean flagDelete = false;
        for (int i = 0; i < MotorcycleList.size(); i++) {
            if (MotorcycleList.get(i).getLicensePlate().equals(licensePlate)) {
                System.out.println("Bạn muốn xóa xe này không ? Nhập Y: yes, N: no ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    MotorcycleList.remove(i);
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
    public void searchMotorcycle() {
        System.out.println("mời bạn nhập biển kiểm sát xe máy ");
        String licensePlate = scanner.nextLine();
        for (int i = 0; i < MotorcycleList.size(); i++) {
            if (MotorcycleList.get(i).getLicensePlate().contains(licensePlate)) {
                System.out.println(MotorcycleList.get(i));
            }
        }
    }
}



