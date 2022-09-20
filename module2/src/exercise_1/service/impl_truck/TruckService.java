package exercise_1.service.impl_truck;

import exercise_1.model.Car;
import exercise_1.model.Truck;
import exercise_1.service.ITruckService;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TruckService implements ITruckService  {

    Scanner scanner = new Scanner(System.in);
    private static List<Truck> TruckList = new ArrayList<>();

    public Truck infoTruck() {
        System.out.println("Mời nhập biển kiểm sát xe tải : ");
        String licensePlate = scanner.nextLine();
        System.out.println("Mời nhập  mã hảng sản xuất xe tải : ");
        String manufacturerCode = scanner.nextLine();
        System.out.println("Mời nhập tên hãng sản xuất xe tải ");
        String manufacturesName = scanner.nextLine();
        System.out.println("Mời nhập tên quốc gia");
        String nation = scanner.nextLine();
        System.out.println("Mời nhập năm sản xuất xe tải");
        int producedYear = Integer.parseInt(scanner.nextLine());
        System.out.println("Mời nhập chủ sở hữu xe tải");
        String owner = scanner.nextLine();
        System.out.println("Mời bạn nhập tải trọng xe tải ");
        double tonnage = Double.parseDouble(scanner.nextLine());
        Truck truck = new Truck(licensePlate, manufacturerCode, manufacturesName, nation, producedYear, owner, tonnage);
        return truck;
    }

    @Override
    public void addTruck() {
        Truck truck = this.infoTruck();
        TruckList.add(truck);
        System.out.println("thêm mới thành công");
    }

    @Override
    public void displayTruck() {
        for (Truck truck : TruckList) {
            System.out.println(truck);
        }

    }

    @Override
    public void removeTruck() {
        System.out.println("mời bạn nhập biển kiểm sát xe tải ");
        String licensePlate = scanner.nextLine();
        boolean flagDelete = false;
        for (int i = 0; i < TruckList.size(); i++) {
            if (TruckList.get(i).getLicensePlate().equals(licensePlate)) {
                System.out.println("Bạn muốn xóa xe này không ? Nhập Y: yes, N: no ");
                String choice = scanner.nextLine();
                if (choice.equals("Y")) {
                    TruckList.remove(i);
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
    public void searchTruck() {
        System.out.println("mời bạn nhập biển kiểm sát xe tải ");
        String licensePlate = scanner.nextLine();
        for (int i = 0; i < TruckList.size(); i++) {
            if (TruckList.get(i).getLicensePlate().contains(licensePlate)) {
                System.out.println(TruckList.get(i));
            }
        }
    }

}
