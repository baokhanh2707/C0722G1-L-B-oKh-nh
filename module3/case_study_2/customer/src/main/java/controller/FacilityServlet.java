package controller;

import model.Customer;
import model.Facility;
import service.IFacilityService;
import service.impl.FacilityService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "FacilityServlet",urlPatterns = "/facility")
public class FacilityServlet extends HttpServlet {
    private IFacilityService facilityService =new FacilityService();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

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
                break;
            case "edit":
                update(request, response);
                break;
            case "search":
                search(request,response);
            default:
                showListFacility(request, response);
        }

    }

    private void search(HttpServletRequest request, HttpServletResponse response) {
        String name = request.getParameter("name");
        List<Facility>facilityList=facilityService.search(name);
        request.setAttribute("facilityList",facilityList);
        try {
            request.getRequestDispatcher("view/facility/list.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void update(HttpServletRequest request, HttpServletResponse response) {
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("deleteId"));
        boolean check = facilityService.delete(id);
        String mess = "Xóa không thành công";
        if (check) {
            mess = "Xóa thành công";
        }
        request.setAttribute("mess", mess);
        showListFacility(request, response);
    }


    private void save(HttpServletRequest request, HttpServletResponse response) {
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        int area=Integer.parseInt(request.getParameter("area"));
        Double cost = Double.parseDouble(request.getParameter("cost"));
        int maxPeople=Integer.parseInt(request.getParameter("maxPeople"));
        int renTypeId=Integer.parseInt(request.getParameter("rentTypeId"));
        int typeId=Integer.parseInt(request.getParameter("typeId"));
        String standardRoom = request.getParameter("standardRoom");
        String description = request.getParameter("description");
        Double poolArea = Double.parseDouble(request.getParameter("poolArea"));
        int numberOfFloors=Integer.parseInt(request.getParameter("numberOfFloors"));
        String text = request.getParameter("text");
        Facility facility = new Facility(id,name,area,cost,maxPeople,renTypeId,typeId,standardRoom,description,poolArea,numberOfFloors,text);
        boolean check = facilityService.add(facility);
        String mess = "Thêm mới không thành công";
        if (check) {
            mess = "Thêm mới thành công";
        }
        request.setAttribute("mess", mess);
        try {
            request.getRequestDispatcher("view/facility/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
                showListFacility(request, response);
        }
    }

    private void showEditForm(HttpServletRequest request, HttpServletResponse response) {

    }

    private void showInputForm(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/facility/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showListFacility(HttpServletRequest request, HttpServletResponse response) {
        List<Facility> facilityList = facilityService.findAll();
        request.setAttribute("facilityList",facilityList);
        try {
            request.getRequestDispatcher("view/facility/list.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
