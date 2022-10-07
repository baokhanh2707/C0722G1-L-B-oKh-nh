package furama_resort.services.impl_facility;

import furama_resort.models.*;
import furama_resort.services.IFacilityService;
import furama_resort.utils.ExceptionFacility;

import java.io.*;
import java.util.*;

public class FacilityService implements IFacilityService {
    Scanner scanner = new Scanner(System.in);
    LinkedHashMap<Facility, Integer> facilityList = new LinkedHashMap<Facility, Integer>();
    LinkedHashMap<Villa,Integer>villaList=new LinkedHashMap<>();
    LinkedHashMap<House,Integer>houseList=new LinkedHashMap<>();
    LinkedHashMap<Room,Integer>roomList=new LinkedHashMap<>();


    @Override
    public void displayFacility() {
LOOP:
        while (true){
            try {
                System.out.println("1. hiển thị danh sách Villa");
                System.out.println("2. hiển thị danh sách House");
                System.out.println("3. hiển thị danh sách Room");
                System.out.println("4. thoát");
                int option = Integer.parseInt(scanner.nextLine());
                switch (option){
                    case 1:
                        villaList=readFileVilla();
                        Set<Villa> villas;
                        villas=villaList.keySet();
                        for(Villa villa :villas){
                            System.out.println(villa);
                        }
                        break;
                    case 2:
                        houseList=readFileHouse();
                        Set<House> houses;
                        houses=houseList.keySet();
                        for(House house :houses){
                            System.out.println(house);
                        }
                        break;
                    case 3:
                        roomList=readFileRoom();
                        Set<Room> rooms;
                        rooms=roomList.keySet();
                        for(Room room :rooms){
                            System.out.println(room);
                        }
                        break;
                    case 4:
                        break LOOP;
                }
                if (option!=1 && option!=2 && option!=3) {
                    throw new IllegalArgumentException("hãy chọn 1 trong 4 chức năng trên");
                }
            }catch (IllegalArgumentException e){
                System.out.println(e.getMessage());
            }
        }

    }


    @Override
    public void displayFacilityMaintenance() {

    }

    @Override
    public void addVilla() {
        villaList= readFileVilla();
        Villa villa = this.inforVilla();
        villaList.put(villa, 0);
        writeFileVilla(villaList);
        System.out.println("Thêm mới thành công");
    }

    @Override
    public void addHouse() {
        houseList=readFileHouse();
        House house = this.infoHouse();
        houseList.put(house, 0);
        writeFileHouse(houseList);
        System.out.println("Thêm mới thành công");
    }

    @Override
    public void addRoom() {
        roomList=readFileRoom();
        Room room = this.infoRoom();
        roomList.put(room, 0);
        writeFileRoom(roomList);
        System.out.println("Thêm mới thành công");
    }
    public Villa inforVilla() {
        String serviceName;
        while (true) {
            try {
                System.out.println("Mời bạn nhập Tên dịch vụ");
                serviceName = scanner.nextLine();
                ExceptionFacility.checkServiceName(serviceName);
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        String serviceCode;
        while (true) {
            try {
                System.out.println("Mời bạn nhập mã dịch vụ");
                serviceCode = scanner.nextLine();
                ExceptionFacility.checkServiceCode(serviceCode, "^[S][V][V][L][0-9]{4}$");
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        Double usableArea;

        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập diện tích sử dụng");
                usableArea = Double.parseDouble(scanner.nextLine());
                if (usableArea >= 30) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("bạn nhập sai rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int rentalCosts;
        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Chi phí thuê");
                rentalCosts = Integer.parseInt(scanner.nextLine());
                if (rentalCosts > 0) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Bạn nhập số âm rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int maximumNumberOfPeople;

        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Số lượng người tối đa");
                maximumNumberOfPeople = Integer.parseInt(scanner.nextLine());
                if (maximumNumberOfPeople > 0 && maximumNumberOfPeople < 20) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Số bạn nhập phải lớn hơn 0 và bé hơn 20");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }

        String rentalType;
        int choice;
        LOOP:
        while (true) {
            try {
                System.out.println("Kiểu thuê dịch vụ");
                System.out.println("1.Theo năm");
                System.out.println("2.Theo tháng");
                System.out.println("3.Theo ngày");
                System.out.println("4.Theo giờ");
                choice = Integer.parseInt(scanner.nextLine());
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
            } catch (NumberFormatException e) {
                System.out.println("Mời bạn nhập lại");
            } catch (IllegalStateException e) {
                System.out.println("Mời bạn nhập lại");
            }

        }
        String roomStandard;
        while (true) {
            try {
                System.out.println("Mời bạn nhập tiêu chuẩn phòng");
                roomStandard = scanner.nextLine();
                ExceptionFacility.checkServiceName(roomStandard);
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        Double poolArea;
        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Diện tích hồ bơi");
                poolArea = Double.parseDouble(scanner.nextLine());
                if (poolArea >= 30) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("bạn nhập sai rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int numberOfFloors;
        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Số tầng");
                numberOfFloors = Integer.parseInt(scanner.nextLine());
                if (numberOfFloors > 0) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Bạn nhập số âm rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        Villa villa = new Villa(serviceName, serviceCode, usableArea, rentalCosts, maximumNumberOfPeople, rentalType, roomStandard, poolArea, numberOfFloors);
        return villa;
    }

    public House infoHouse() {

        String serviceName;
        while (true) {
            try {
                System.out.println("Mời bạn nhập Tên dịch vụ");
                serviceName = scanner.nextLine();
                ExceptionFacility.checkServiceName(serviceName);
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        String serviceCode;
        while (true) {
            try {
                System.out.println("Mời bạn nhập mã dịch vụ");
                serviceCode = scanner.nextLine();
                ExceptionFacility.checkServiceCode(serviceCode, "^[S][V][H][O][0-9]{4}$");
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        Double usableArea;

        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập diện tích sử dụng");
                usableArea = Double.parseDouble(scanner.nextLine());
                if (usableArea >= 30) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("bạn nhập sai rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int rentalCosts;
        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Chi phí thuê");
                rentalCosts = Integer.parseInt(scanner.nextLine());
                if (rentalCosts > 0) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Bạn nhập số âm rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int maximumNumberOfPeople;

        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Số lượng người tối đa");
                maximumNumberOfPeople = Integer.parseInt(scanner.nextLine());
                if (maximumNumberOfPeople > 0 && maximumNumberOfPeople < 20) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Số bạn nhập phải lớn hơn 0 và bé hơn 20");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }

        String rentalType;
        int choice;
        LOOP:
        while (true) {
            try {
                System.out.println("Kiểu thuê dịch vụ");
                System.out.println("1.Theo năm");
                System.out.println("2.Theo tháng");
                System.out.println("3.Theo ngày");
                System.out.println("4.Theo giờ");
                choice = Integer.parseInt(scanner.nextLine());
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
            } catch (NumberFormatException e) {
                System.out.println("Mời bạn nhập lại");
            } catch (IllegalStateException e) {
                System.out.println("Mời bạn nhập lại");
            }

        }
        String roomStandard;
        while (true) {
            try {
                System.out.println("Mời bạn nhập tiêu chuẩn phòng");
                roomStandard = scanner.nextLine();
                ExceptionFacility.checkServiceName(roomStandard);
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }

        int numberOfFloors;
        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Số tầng");
                numberOfFloors = Integer.parseInt(scanner.nextLine());
                if (numberOfFloors > 0) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Bạn nhập số âm rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        House house = new House(serviceName, serviceCode, usableArea, rentalCosts, maximumNumberOfPeople, rentalType, roomStandard, numberOfFloors);
        return house;
    }

    public Room infoRoom() {
        String serviceName;
        while (true) {
            try {
                System.out.println("Mời bạn nhập tên dịch vụ");
                serviceName = scanner.nextLine();
                ExceptionFacility.checkServiceName(serviceName);
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        String serviceCode;
        while (true) {
            try {
                System.out.println("Mời bạn nhập mã dịch vụ");
                serviceCode = scanner.nextLine();
                ExceptionFacility.checkServiceCode(serviceCode, "^[S][V][R][O][0-9]{4}$");
                break;
            } catch (ExceptionFacility exceptionFacility) {
                System.out.println(exceptionFacility.getMessage());
            }
        }
        Double usableArea;

        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập diện tích sử dụng");
                usableArea = Double.parseDouble(scanner.nextLine());
                if (usableArea >= 30) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("bạn nhập sai rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int rentalCosts;
        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Chi phí thuê");
                rentalCosts = Integer.parseInt(scanner.nextLine());
                if (rentalCosts > 0) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Bạn nhập số âm rồi mời bạn nhập lại");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }
        int maximumNumberOfPeople;

        while (true) {
            boolean flag = false;
            try {
                System.out.println("Mời bạn nhập Số lượng người tối đa");
                maximumNumberOfPeople = Integer.parseInt(scanner.nextLine());
                if (maximumNumberOfPeople > 0 && maximumNumberOfPeople < 20) {
                    flag = true;
                    break;
                }
                if (!flag) {
                    System.out.println("Số bạn nhập phải lớn hơn 0 và bé hơn 20");
                }
            } catch (NumberFormatException e) {
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }
        }

        String rentalType;
        int choice;
        LOOP:
        while (true) {
            try {
                System.out.println("Kiểu thuê dịch vụ");
                System.out.println("1.Theo năm");
                System.out.println("2.Theo tháng");
                System.out.println("3.Theo ngày");
                System.out.println("4.Theo giờ");
                choice = Integer.parseInt(scanner.nextLine());
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
            } catch (NumberFormatException e) {
                System.out.println("Mời bạn nhập lại");
            } catch (IllegalStateException e) {
                System.out.println("Mời bạn nhập lại");
            }

        }
        String freeServiceIncluded;
        while (true){
            try {
                System.out.println("Mời bạn nhập dịch vụ miễn phí");
                freeServiceIncluded = scanner.nextLine();
                break;
            }catch (NumberFormatException e){
                System.out.println("Bạn nhập sai rồi mời bạn nhập lại");
            }

        }

        Room room = new Room(serviceName, serviceCode, usableArea, rentalCosts, maximumNumberOfPeople, rentalType, freeServiceIncluded);
        return room;
    }
    private LinkedHashMap<Villa,Integer> readFileVilla() {
        LinkedHashMap<Villa,Integer> villaList = new LinkedHashMap<>();
        BufferedReader bufferedReader = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\villa.txt");
            FileReader fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line;
            String[] list;
            Villa villa;
            while ((line = bufferedReader.readLine()) != null) {
                list = line.split(",");
                villa = new Villa(list[0],list[1],Double.parseDouble(list[2]),Integer.parseInt(list[3]),Integer.parseInt(list[4]),list[5],list[6],Double.parseDouble(list[7]),Integer.parseInt(list[8]));
                villaList.put(villa,0);
            }
        } catch (FileNotFoundException e) {
            e.getMessage();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedReader.close();
        } catch (IOException e) {
            e.getMessage();
        }
        return villaList;
    }
    private LinkedHashMap<House,Integer> readFileHouse() {
        LinkedHashMap<House,Integer> houseList = new LinkedHashMap<>();
        BufferedReader bufferedReader = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\house.txt");
            FileReader fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line;
            String[] list;
            House house;
            while ((line = bufferedReader.readLine()) != null) {
                list = line.split(",");
                house = new House(list[0],list[1],Double.parseDouble(list[2]),Integer.parseInt(list[3]),Integer.parseInt(list[4]),list[5],list[6],Integer.parseInt(list[7]));
                houseList.put(house,0);
            }
        } catch (FileNotFoundException e) {
            e.getMessage();
        } catch (IOException e) {
            e.getMessage();
        }catch (ArrayIndexOutOfBoundsException e){
            e.getMessage();
        }
        try {
            bufferedReader.close();
        } catch (IOException e) {
            e.getMessage();
        }
        return houseList;
    }
    private LinkedHashMap<Room,Integer> readFileRoom() {
        LinkedHashMap<Room,Integer> roomList = new LinkedHashMap<>();
        BufferedReader bufferedReader = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\room.txt");
            FileReader fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line;
            String[] list;
            Room room;
            while ((line = bufferedReader.readLine()) != null) {
                list = line.split(",");
                room = new Room(list[0],list[1],Double.parseDouble(list[2]),Integer.parseInt(list[3]),Integer.parseInt(list[4]),list[5],list[6]);
                roomList.put(room,0);
            }
        } catch (FileNotFoundException e) {
            e.getMessage();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedReader.close();
        } catch (IOException e) {
            e.getMessage();
        }
        return roomList;
    }
    private void writeFileVilla(LinkedHashMap<Villa,Integer>villaList){
        BufferedWriter bufferedWriter = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\villa.txt");
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            Set<Villa> villas;
            villas=villaList.keySet();
            for(Villa villa :villas){
                bufferedWriter.write(getInforVilla(villa));
                bufferedWriter.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void writeFileHouse(LinkedHashMap<House,Integer>houseList){
        BufferedWriter bufferedWriter = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\house.txt");
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            Set<House> houses;
            houses=houseList.keySet();
            for(House house :houses){
                bufferedWriter.write(getInforHouse(house));
                bufferedWriter.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void writeFileRoom(LinkedHashMap<Room,Integer>roomList){
        BufferedWriter bufferedWriter = null;
        try {
            File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\room.txt");
            bufferedWriter = new BufferedWriter(new FileWriter(file));
            Set<Room> rooms;
            rooms=roomList.keySet();
            for(Room room :rooms){
                bufferedWriter.write(getInforRoom(room));
                bufferedWriter.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private String getInforVilla(Villa villa){
        return String.format("%s,%s,%s,%s,%s,%s,%s,%s,%s",villa.getServiceName(),villa.getServiceCode(),villa.getUsableArea()+"m2",villa.getRentalCosts(),villa.getMaximumNumberOfPeople(),villa.getRentalType(),
                villa.getRoomStandard(),villa.getPoolArea()+"m2",villa.getNumberOfFloors());
    }
    private String getInforHouse(House house){
        return String.format("%s,%s,%s,%s,%s,%s,%s",house.getServiceName(),house.getServiceCode(),house.getUsableArea()+"m2",house.getRentalCosts(),house.getMaximumNumberOfPeople(),house.getRentalType(),house.getRoomStandard());
    }
    private String getInforRoom(Room room){
        return String.format("%s,%s,%s,%s,%s,%s,%s",room.getServiceName(),room.getServiceCode(),room.getUsableArea()+"m2",room.getRentalCosts(),room.getMaximumNumberOfPeople(),room.getRentalType(),room.getFreeServiceIncluded());
    }
    }

