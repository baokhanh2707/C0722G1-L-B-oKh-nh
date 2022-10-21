package furama_resort.services.impl_booking;


import furama_resort.models.*;
import furama_resort.services.IBookingService;
import furama_resort.services.impl_customer.CustomerService;

import furama_resort.services.impl_facility.FacilityService;
import furama_resort.utils.ExceptionFacility;
import furama_resort.utils.ExceptionPerson;

import java.io.*;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class BookingService implements IBookingService {
    private static Scanner scanner=new Scanner(System.in);
    private static TreeSet<Booking> bookingList = new TreeSet<>();
    public static FacilityService facility=new FacilityService();
    private static CustomerService customerService = new CustomerService();
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    @Override
    public void addBooking() {
        bookingList = getDataFromFile();
        Booking booking = infoBooking();
        bookingList.add(booking);
        if (booking.getServiceCode().contains("SVHO")) {
            LinkedHashMap<House, Integer> houseList = FacilityService.readFileHouse();
            Set<House> houses = houseList.keySet();
            for (House house : houses) {
                if (house.getServiceCode().equals(booking.getServiceCode())) {
                    houseList.replace(house, houseList.get(house) + 1);
                    break;
                }
            }
            facility.writeFileHouse(houseList);
            System.out.println("Remember to make a rental agreement");
        } else if (booking.getServiceCode().contains("SVRO")) {
            LinkedHashMap<Room, Integer> roomList = FacilityService.readFileRoom();
            Set<Room> roomSet = roomList.keySet();
            for (Room room : roomSet) {
                if (room.getServiceCode().equals(booking.getServiceCode())) {
                    roomList.replace(room, roomList.get(room) + 1);
                    break;
                }
            }
            facility.writeFileRoom(roomList);
        } else if (booking.getServiceCode().contains("SVVL")) {
            LinkedHashMap<Villa, Integer> villaList = FacilityService.readFileVilla();
            Set<Villa> villaSet = villaList.keySet();
            for (Villa villa : villaSet) {
                if (villa.getServiceCode().equals(booking.getServiceCode())) {
                    villaList.replace(villa, villaList.get(villa) + 1);
                    break;
                }
            }
            facility.writeFileVilla(villaList);
            System.out.println("Remember to make a rental agreement");
        }
        writeFile(bookingList);
    }



    @Override
    public void displayBooking() {
        bookingList = getDataFromFile();
        for (Booking booking : bookingList) {
            System.out.println(booking.toString());
        }
    }

    @Override
    public void createConstracts() {

    }

    @Override
    public void displayConstracts() {

    }

    @Override
    public void editConstracts() {

    }
    private static Booking infoBooking() {
        String codeBooking;
        while (true) {
            try {
                System.out.println("Mời bạn nhập mã booking");
                codeBooking = scanner.nextLine();
                ExceptionFacility.checkServiceCode(codeBooking, "[B][K][0-9]{1,3}");
                break;
            } catch (ExceptionFacility e) {
                System.out.println(e.getMessage());
            }
        }
        LocalDate starDay;
        while (true) {
            try {
                System.out.println("Enter Star Day to be corrected!");
                String date = scanner.nextLine();
                ExceptionFacility.checkDate(date);
                starDay = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                ExceptionFacility.checkStartDay(starDay);
                break;
            } catch (DateTimeException | ExceptionFacility e) {
                System.out.println(e.getMessage());
            }
        }
        LocalDate endDay;
        while (true) {
            try {
                System.out.println("Enter EndDay to be corrected!");
                String date = scanner.nextLine();
                ExceptionFacility.checkDate(date);
                endDay = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
                ExceptionFacility.checkEndDay(endDay, starDay);
                break;
            } catch (DateTimeException e) {
                System.out.println("Enter incorrect format of day, re-enter");
            } catch (ExceptionFacility e) {
                System.out.println(e.getMessage());
            }
        }
        String codeCustomer;
        customerService.displayCustomer();
        while (true) {
            try {
                System.out.println("Enter your Code to be corrected!");
                codeCustomer = scanner.nextLine();
                ExceptionPerson.checkCode(codeCustomer, "^[K][H][0-9]{1,3}$");
                boolean flag = false;
                for (Customer customerService : customerService.readFile()) {
                    if (customerService.getCode().equals(codeCustomer)) {
                        flag = true;
                        break;
                    }

                }
                if (flag) {
                    break;
                } else {
                    System.out.println("Code not found! Please re-enter!");
                }
            } catch (ExceptionPerson e) {
                System.out.println(e.getMessage());
            }
        }
        String serviceCode;
        facility.displayFacility();
        while (true) {
            try {
                System.out.println("Please enter the service code you need to use!");
                serviceCode = scanner.nextLine();
                ExceptionFacility.checkServiceCode(serviceCode, "^[S][V][V][L][0-9]{4}$");
                boolean flag = false;
                Map<Villa, Integer> villaIntegerMap = FacilityService.readFileVilla();
                Set<Villa> villaSet = villaIntegerMap.keySet();
                for (Facility villa : villaSet) {
                    if (villa.getServiceCode().equals(serviceCode)) {
                        flag = true;
                        break;
                    }
                    Map<House, Integer> houseIntegerMap = FacilityService.readFileHouse();
                    Set<House> houseSet = houseIntegerMap.keySet();
                    for (Facility house : houseSet) {
                        if (house.getServiceCode().equals(serviceCode)) {
                            flag = true;
                            break;
                        }
                        Map<Room, Integer> roomIntegerMap = FacilityService.readFileRoom();
                        Set<Room> roomSet = roomIntegerMap.keySet();
                        for (Facility room : roomSet) {
                            if (room.getServiceCode().equals(serviceCode)) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
                            break;
                        } else {
                            System.out.println("Code not found! Please re-enter!");
                        }
                    }
                }

            } catch (ExceptionFacility e) {
                System.out.println(e.getMessage());
            }
        }
    }
    public TreeSet<Booking> getDataFromFile() {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\booking.txt");
        FileReader fileReader;
        BufferedReader bufferedReader = null;
        TreeSet<Booking> bookingList = new TreeSet<>();

        try {
            fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String[] info;
            Booking booking;
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                info = line.split(",");
                booking = new Booking();
                booking.setCodeBooking(info[0]);
                booking.setStartDay(LocalDate.parse(info[1],formatter));
                booking.setEndDay(LocalDate.parse(info[2]));
                booking.setCodeCustomer(info[3]);
                booking.setServiceCode(info[4]);
                booking.setTypeOfService(info[5]);

                bookingList.add(booking);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        try {
            if (bufferedReader != null) {
                bufferedReader.close();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return bookingList;
    }
    private void writeFile(TreeSet<Booking> bookingList) {
        File file = new File("D:\\C0722G1-L-B-oKh-nh\\module2\\src\\furama_resort\\data\\booking.txt");

        BufferedWriter bufferedWriter = null;

        try {
            FileWriter fileWriter = new FileWriter(file);
            bufferedWriter = new BufferedWriter(fileWriter);
            for (Booking booking : bookingList) {
                bufferedWriter.write(getInfo(booking));
                bufferedWriter.newLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            if (bufferedWriter != null) {
                bufferedWriter.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getInfo(Booking booking) {
        return String.format("%s,%s,%s,%s,%s,%s",
                booking.getCodeBooking(), booking.getStartDay() ,booking.getEndDay(), booking.getCodeCustomer(), booking.getServiceCode(), booking.getTypeOfService());
    }


}