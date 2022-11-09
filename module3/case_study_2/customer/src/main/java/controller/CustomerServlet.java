package controller;

import model.Customer;
import service.ICustomerService;
import service.impl.CustomerService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@javax.servlet.annotation.WebServlet(name = "CustomerServlet", urlPatterns = "/customer")
public class CustomerServlet extends javax.servlet.http.HttpServlet {
    private ICustomerService customerService = new CustomerService();

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "add":
                save(request, response);
                break;
            case "delete":
                delete(request, response);
            case "edit":
                update(request, response);
            default:
                showListCustomer(request, response);
        }
    }

    private void update(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        int idType = Integer.parseInt(request.getParameter("idType"));
        String name = request.getParameter("name");
        String dayOfBirth = request.getParameter("dayOfBirth");
        String gender = request.getParameter("gender");
        String idCard = request.getParameter("idCard");
        String phoneNumber = request.getParameter("phoneNumber");
        String email = request.getParameter("email");
        String address = request.getParameter("address");
        Customer customer = new Customer(id, idType, name, dayOfBirth, gender, idCard, phoneNumber, email, address);
        customerService.edit(id,customer);
        boolean check=customerService.edit(id,customer);
        String mess="Sửa không thành công";
        if (check){
            mess="Sửa thành công";
        }
        request.setAttribute("mess",mess);
        try {
            request.getRequestDispatcher("view/customer/edit.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("deleteId"));
        boolean check = customerService.delete(id);
        String mess = "Xóa không thành công";
        if (check) {
            mess = "Xóa thành công";
        }
        request.setAttribute("mess", mess);
        showListCustomer(request, response);
    }


    private void save(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        int idType = Integer.parseInt(request.getParameter("idType"));
        String name = request.getParameter("name");
        String dayOfBirth = request.getParameter("dayOfBirth");
        String gender = request.getParameter("gender");
        String idCard = request.getParameter("idCard");
        String phoneNumber = request.getParameter("phoneNumber");
        String email = request.getParameter("email");
        String address = request.getParameter("address");
        Customer customer = new Customer(id, idType, name, dayOfBirth, gender, idCard, phoneNumber, email, address);
        boolean check = customerService.add(customer);
        String mess = "Thêm mới không thành công";
        if (check) {
            mess = "Thêm mới thành công";
        }
        request.setAttribute("mess", "Thêm mới thành công");
        try {
            request.getRequestDispatcher("view/customer/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showListCustomer(HttpServletRequest request, HttpServletResponse response) {
        List<Customer> customerList = customerService.finAll();
        request.setAttribute("customerList", customerList);
        try {
            request.getRequestDispatcher("view/customer/list.jsp").forward(request, response);
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
                showInputForm(request, response);
                break;
            case "edit":
                showEditForm(request,response);
                break;
            default:
                showListCustomer(request, response);
        }
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        List<Customer> userList=customerService.finAll();
        Customer customer = null;
        String str="";
        for (Customer customer1:userList){
            if (customer1.getId()==id){
                customer=customer1;
                break;
            }
        }
        request.setAttribute("id",customer.getId());
        request.setAttribute("idType",customer.getIdType());
        request.setAttribute("name",customer.getName());
        request.setAttribute("dayOfBirth", Date.valueOf(customer.getDayOfBirth()));
        request.setAttribute("gender", Boolean.parseBoolean(customer.getGender()));
        request.setAttribute("idCard",customer.getIdCard());
        request.setAttribute("phoneNumber",customer.getPhoneNumber());
        request.setAttribute("email",customer.getEmail());
        request.setAttribute("address",customer.getAddress());
        request.getRequestDispatcher("view/customer/edit.jsp");
    }

    private void showInputForm(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/customer/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

