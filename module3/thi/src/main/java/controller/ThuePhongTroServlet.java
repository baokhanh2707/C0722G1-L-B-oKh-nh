package controller;

import model.ThuePhongTro;
import service.IThuePhongTroService;
import service.impl.ThuePhongTroService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@WebServlet(name = "ThuePhongTroServlet",urlPatterns = "/phongtro")
public class ThuePhongTroServlet extends HttpServlet {
    private IThuePhongTroService thuePhongTroService =new ThuePhongTroService();
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
            case "searchName":
                searchName(request,response);
                break;
            case "searchId":
                searchId(request,response);
                break;
            default:
                showListThuePhongTro(request, response);
        }
    }

    private void searchId(HttpServletRequest request, HttpServletResponse response) {
        int maPhongTro = Integer.parseInt(request.getParameter("maPhongTro"));
        List<ThuePhongTro>thuePhongTroSearch=thuePhongTroService.searchId(maPhongTro);
        request.setAttribute("thuePhongTroList",thuePhongTroSearch);
        try {
            request.getRequestDispatcher("view/thue_phong_tro/list.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void searchName(HttpServletRequest request, HttpServletResponse response) {
        String tenNguoiThueTro = request.getParameter("tenNguoiThueTro");
        List<ThuePhongTro>thuePhongTroSearch=thuePhongTroService.searchName(tenNguoiThueTro);
        request.setAttribute("thuePhongTroList",thuePhongTroSearch);
        try {
            request.getRequestDispatcher("view/thue_phong_tro/list.jsp").forward(request,response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private void delete(HttpServletRequest request, HttpServletResponse response) {
        int maPhongTro = Integer.parseInt(request.getParameter("deleteId"));
        boolean check = thuePhongTroService.delete(maPhongTro);
        String mess = "Xóa không thành công";
        if (check) {
            mess = "Xóa thành công";
        }
        request.setAttribute("mess", mess);
        showListThuePhongTro(request, response);
    }

    private void save(HttpServletRequest request, HttpServletResponse response) {
        String tenNguoiThueTro = request.getParameter("tenNguoiThueTro");
        String soDienThoai = request.getParameter("SoDienThoai");
        String ngayBatDau =  request.getParameter("ngayBatDau");
        int maHinhThucThanhToan = Integer.parseInt(request.getParameter("maHinhThucThanhToan"));
        String ghiChu = request.getParameter("ghiChu");
        ThuePhongTro thuePhongTro=new ThuePhongTro(tenNguoiThueTro,soDienThoai,ngayBatDau,maHinhThucThanhToan,ghiChu);
        boolean check = thuePhongTroService.add(thuePhongTro);
        String mess = "Thêm mới không thành công";
        if (check) {
            mess = "Thêm mới thành công";
        }
        request.setAttribute("mess", mess);
        try {
            request.getRequestDispatcher("view/thue_phong_tro/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void showListThuePhongTro(HttpServletRequest request, HttpServletResponse response) {
        List<ThuePhongTro> thuePhongTroList = thuePhongTroService.findAll();
        request.setAttribute("thuePhongTroList", thuePhongTroList);
        try {
            request.getRequestDispatcher("view/thue_phong_tro/list.jsp").forward(request,response);
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
            default:
                showListThuePhongTro(request, response);
        }
    }

    private void showInputForm(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getRequestDispatcher("view/thue_phong_tro/create.jsp").forward(request, response);
        } catch (ServletException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
