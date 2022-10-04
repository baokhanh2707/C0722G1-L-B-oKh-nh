package furama_resort.services.impl_facility;

import furama_resort.models.Facility;
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
    public void addFacility() {
        while (true) {
            System.out.println("Mời bạn lựa chọn dịch vụ muốn thêm");
            System.out.println("1.Add New Villa");
            System.out.println("2.Add New House");
            System.out.println("3.Add New Room");
            System.out.println("4.Back to menu");
            int choice = Integer.parseInt(scanner.nextLine());
            switch (choice) {
                case 1:

                case 2:

                case 3:

                case 4:
                    return;
                default:throw new  IllegalStateException("Unexpected value: " + choice);
            }
        }
    }

    @Override
    public void displayFacilityMaintenance() {

    }
}
