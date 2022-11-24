package controller;

import model.BenhAn;
import service.IBenhAnService;
import service.impl.BenhAnService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "Servlet",urlPatterns = "/benhAn")
public class BenhAnServlet extends HttpServlet {
private IBenhAnService benhAnService=new BenhAnService();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }
        switch (action) {
            case "delete":
                delete(request, response);
                break;
            default:
                showListBenhAn(request, response);
        }
    }

    private void delete(HttpServletRequest request, HttpServletResponse response) {
        int maBenhAn = Integer.parseInt(request.getParameter("deleteId"));
        boolean check =benhAnService.delete(maBenhAn);
        String mess = "Xóa không thành công";
        if (check) {
            mess = "Xóa thành công";
        }
        request.setAttribute("mess", mess);
        showListBenhAn(request, response);
    }

    private void showListBenhAn(HttpServletRequest request, HttpServletResponse response) {
        List<BenhAn> benhAnList = benhAnService.finAll();
        request.setAttribute("benhAnList", benhAnList);
        try {
            request.getRequestDispatcher("view/benh_an/list.jsp").forward(request,response);
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

            default:
                showListBenhAn(request, response);
        }
    }

}
