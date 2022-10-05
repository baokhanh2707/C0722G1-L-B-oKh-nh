package furama_resort.services.impl_facility;

import furama_resort.models.Facility;
import furama_resort.models.Villa;
import furama_resort.services.IFacilityService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Scanner;

public class FacilityService implements IFacilityService {
    Scanner scanner = new Scanner(System.in);
    LinkedHashMap<Facility, Integer> facilityList = new LinkedHashMap<Facility, Integer>();

    @Override
    public void displayFacility() {

    }


    @Override
    public void displayFacilityMaintenance() {

    }

    @Override
    public void addVilla() {

    }

    @Override
    public void addHouse() {

    }

    @Override
    public void addRoom() {

    }
    public Villa inforVilla(){
        System.out.println("Mời bạn nhập Tên dịch vụ");
        String serviceName=scanner.nextLine();
        System.out.println("Mời bạn nhập mã dịch vụ");
        String serviceCode=scanner.nextLine();
        System.out.println("Mời bạn nhập diện tích sử dụng");
        String usableArea =scanner.nextLine();
        System.out.println("Mời bạn nhập Chi phí thuê");
        String rentalCosts=scanner.nextLine();
        System.out.println("Mời bạn nhập Số lượng người tối đa");
        String maximumNumberOfPeople=scanner.nextLine();

        String rentalType;
        LOOP:
        while (true) {
        System.out.println("Kiểu thuê dịch vụ");
        System.out.println("1.Theo năm");
        System.out.println("2.Theo tháng");
        System.out.println("3.Theo ngày");
        System.out.println("4.Theo giờ");
        int choice=Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:
                    rentalType = "Thuê theo năm";
                    break LOOP;
                case 2:
                    rentalType = "Thuê theo tháng";
                    break LOOP;
                case 3:
                    rentalType = "thuê theo ngày";
                    break LOOP;
                case 4:
                    rentalType = "Thuê theo giờ";
                    break LOOP;
                default:
                    throw new IllegalStateException("Unexpected value: " + choice);

            }
        }
        System.out.println("Mời bạn nhập tiêu chuẩn phòng");
        String roomStandard=scanner.nextLine();
        System.out.println("Mời bạn nhập Diện tích hồ bơi");
        String poolArea=scanner.nextLine();
        System.out.println("Mời bạn nhập Số tầng");
        String numberOfFloors=scanner.nextLine();
       Villa villa =new Villa(serviceName,serviceCode,usableArea,rentalCosts,maximumNumberOfPeople,rentalType,roomStandard,poolArea,numberOfFloors);
        return villa;
    }

}