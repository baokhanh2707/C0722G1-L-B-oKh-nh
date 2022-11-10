package controller;

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
//            case "delete":
//                delete(request, response);
//                break;
//            case "edit":
//                update(request, response);
//                break;
//            case "search":
//                search(request,response);
            default:
                showListCustomer(request, response);
        }

    }

    private void save(HttpServletRequest request, HttpServletResponse response) {
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
//            case "edit":
//                showEditForm(request,response);
//                break;
            default:
                showListCustomer(request, response);
        }
    }

    private void showInputForm(HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("");
    }

    private void showListCustomer(HttpServletRequest request, HttpServletResponse response) {
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
