package controller;

import model.Customer;
import service.ICustomerService;
import service.impl.CustomerService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@javax.servlet.annotation.WebServlet(name = "CustomerServlet",urlPatterns = "/customer")
public class CustomerServlet extends javax.servlet.http.HttpServlet {
    private ICustomerService customerService=new CustomerService();

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "add":
                save(request,response);
                break;
            default:
                showListCustomer(request, response);
        }
    }

    private void save(HttpServletRequest request, HttpServletResponse response) {
        int id =Integer.parseInt(request.getParameter("id"));
        int idType=Integer.parseInt(request.getParameter("idType"));
        String name=request.getParameter("name");
        String dayOfBirth=request.getParameter("dayOfBirth");
        String gender=request.getParameter("gender");
        String idCard=request.getParameter("idCard");
        String phoneNumber=request.getParameter("phoneNumber");
        String email=request.getParameter("email");
        String address=request.getParameter("address");
        Customer customer =new Customer(id,idType,name,dayOfBirth,gender,idCard,phoneNumber,email,address);
        boolean check =customerService.add(customer);
        String mess="Thêm mới không thành công";
        if(check){
            mess="Thêm mới thành công";
        }
        request.setAttribute("mess","Thêm mới thành công");
        try {
            request.getRequestDispatcher("view/customer/create.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showListCustomer(HttpServletRequest request, HttpServletResponse response) {
        List<Customer>customerList=customerService.finAll();
        request.setAttribute("customerList",customerList);
        try {
            request.getRequestDispatcher("view/customer/list.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "add":
            showInputForm(request,response);
            break;

            default:
                showListCustomer(request, response);
        }
    }

    private void showInputForm(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/customer/list.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

