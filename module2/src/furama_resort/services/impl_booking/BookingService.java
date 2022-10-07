package furama_resort.services.impl_booking;


import furama_resort.models.Booking;
import furama_resort.services.IBookingService;
import furama_resort.services.IService;

import java.awt.print.Book;
import java.util.Scanner;
import java.util.SortedSet;
import java.util.TreeSet;

public class BookingService implements IBookingService {
    private static Scanner scanner=new Scanner(System.in);
    private static SortedSet<Booking> bookList = new TreeSet<>();
    @Override
    public void addBooking() {

    }

    @Override
    public void displayBooking() {

    }

    @Override
    public void createConstracts() {

    }

    @Override
    public void displayConstracts() {

    }

    @Override
    public void editConstracts() {

    }}
//    public Booking infoBooking(){
//        System.out.println("Mời bạn nhập mã booking");
//        String codeBooking=scanner.nextLine();
//        System.out.println("Mời bạn nhập ngày bắt đầu");
//        int startDay=Integer.parseInt(scanner.nextLine());
//
//
//
//
//}
